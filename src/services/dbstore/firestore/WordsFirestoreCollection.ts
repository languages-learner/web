import firebase from 'firebase/app'
import 'firebase/firestore'
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;
import CollectionReference = firebase.firestore.CollectionReference;
import type { Word, Words } from '@/services/dbstore/dto/Words'
import type { IWordsCollection } from '@/services/dbstore/interfaces/IWordsCollection'
import type { FirestoreCollectionFilter } from '@/services/dbstore/firestore/types/FirestoreCollectionFilter'
import type { WordsCollectionFetchItemsFilter } from '@/services/dbstore/types/words/WordsCollectionFetchItemsFilter'
import { EWordStatus } from '@/services/dbstore/dto/Words'
import { EFirestoreCollectionFilterType } from '@/services/dbstore/firestore/enums/EFirestoreCollectionFilterType'
import { BaseFirestoreCollection } from '@/services/dbstore/firestore/common/BaseFirestoreCollection'
import { useUserStoreWithOut } from '@/store/modules/user'

const COLLECTION_NAME = 'words'

type WordsCollection = {
    [uid: string]: {
        [collectionName: string]: Words
    }
}

export class WordsFirestoreCollection extends BaseFirestoreCollection<WordsCollection> implements IWordsCollection {
    constructor() {
        super(COLLECTION_NAME)
    }

    private getCollectionName = (sourceLanguageId: number, targetLanguageId: number) => `${sourceLanguageId}_${targetLanguageId}`
    private get wordCollection() {
        const userStore = useUserStoreWithOut()

        if (!userStore.profileData || !userStore.customData){
            throw new Error('User data not initialized')
        }

        return this._collection
            .doc(userStore.profileData.uid)
            .collection(this.getCollectionName(userStore.customData.activeLearningLanguage, userStore.customData.nativeLanguage))
    }

    private setFetchItemsFilters = (collection: CollectionReference, filters: Array<WordsCollectionFetchItemsFilter>) => {
        const firestoreCollectionFilters: Array<FirestoreCollectionFilter> = []

        filters.forEach(filter => {
            switch (filter.type) {
            case 'word':
                if (filter.value) {
                    firestoreCollectionFilters.push({
                        property: 'documentId',
                        type: EFirestoreCollectionFilterType.GREATER_THAN_OR_EQUAL_TO,
                        value: filter.value,
                    })
                    firestoreCollectionFilters.push({
                        property: 'documentId',
                        type: EFirestoreCollectionFilterType.LESS_THAN,
                        value: `${filter.value}z`,
                    })
                }
                break
            case 'status':
                if (filter.value !== -1) {
                    firestoreCollectionFilters.push({
                        property: 'status',
                        type: EFirestoreCollectionFilterType.EQUAL_TO,
                        value: filter.value,
                    })
                }
                break
            }
        })

        if (firestoreCollectionFilters.length) {
            return super.setFilters(collection, firestoreCollectionFilters)
        }

        return collection.orderBy('created', 'desc')
    }

    private _lastItem: QueryDocumentSnapshot | null = null
    public items = async (
        paginate: boolean,
        limit: number,
        filters: Array<WordsCollectionFetchItemsFilter>,
        abortController?: AbortController): Promise<Words | null> => {
        const items: Words = {}
        let query = this.setFetchItemsFilters(this.wordCollection, filters)

        if (paginate && this._lastItem) {
            query = query.startAt(this._lastItem)
            limit += 1
        }

        const querySnapshot = await query
            .limit(limit)
            .get()

        if (abortController?.signal.aborted) {
            return null
        }

        if (paginate) {
            this._lastItem = querySnapshot.docs.at(-1) ?? this._lastItem
        }

        querySnapshot.forEach(doc => {
            items[doc.id] = doc.data() as Word
        })

        return items
    }

    public resetWordsPagination = () => {
        this._lastItem = null
    }

    public create = async (word: string, translations: Word['translations']) => {
        const completeWordData: Word = {
            translations,
            status: EWordStatus.NEW_WORD,
            created: firebase.firestore.Timestamp.now().seconds,
            updated: firebase.firestore.Timestamp.now().seconds,
        }

        await this.wordCollection
            .doc(word)
            .set(completeWordData)

        return completeWordData
    }

    public update = async (word: string, wordData: Word) => {
        wordData.updated = firebase.firestore.Timestamp.now().seconds

        await this.wordCollection
            .doc(word)
            .update(wordData)

        return wordData
    }

    public delete = async (word: string): Promise<void> => {
        return await this.wordCollection
            .doc(word)
            .delete()
    }

    public has = async (word: string): Promise<boolean> => {
        const words = await this.items(false, 1, [{
            type: 'word',
            value: word,
        }], undefined)

        return Boolean(words && Object.keys(words).length > 0)
    }
}
