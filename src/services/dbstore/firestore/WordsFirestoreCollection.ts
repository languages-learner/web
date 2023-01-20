import firebase from 'firebase/app'
import 'firebase/firestore'
import type { Word, Words } from '@/modules/words/models/Words'
import type { IWordsCollection } from '@/services/dbstore/interfaces/IWordsCollection'
import type { FirestoreCollectionFilter } from '@/services/dbstore/firestore/types/FirestoreCollectionFilter'
import type { WordsCollectionFetchItemsFilter } from '@/services/dbstore/types/words/WordsCollectionFetchItemsFilter'
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;
import CollectionReference = firebase.firestore.CollectionReference;
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
                        value: filter.value
                    })
                    firestoreCollectionFilters.push({
                        property: 'documentId',
                        type: EFirestoreCollectionFilterType.LESS_THAN,
                        value: `${filter.value}z`
                    })
                }
                break
            case 'status':
                if (filter.value !== -1) {
                    firestoreCollectionFilters.push({
                        property: 'status',
                        type: EFirestoreCollectionFilterType.EQUAL_TO,
                        value: filter.value
                    })
                }
                break
            }
        })

        if (firestoreCollectionFilters.length) {
            return super.setFilters(collection, firestoreCollectionFilters)
        }

        return collection
    }

    private _lastItem: QueryDocumentSnapshot | null = null
    public items = async (paginate: boolean, limit: number, filters: Array<WordsCollectionFetchItemsFilter>): Promise<Words | null> => {
        const items: Words = {}
        const query = this.setFetchItemsFilters(this.wordCollection, filters)

        if (paginate && this._lastItem) {
            query.startAt(this._lastItem)
            limit += 1
        }

        const querySnapshot = await query
            .limit(limit)
            .get()

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

    public create = async (word: string, wordData: Omit<Word, 'created' | 'updated'>) => {
        const completeWordData: Word = {
            ...wordData,
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
}
