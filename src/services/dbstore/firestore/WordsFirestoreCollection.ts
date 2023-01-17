import firebase from 'firebase/app'
import 'firebase/firestore'
import type { Word, Words } from '@/modules/words/models/Words'
import type { IWordsCollection } from '@/services/dbstore/interfaces/IWordsCollection'
import { useUserStoreWithOut } from '@/store/modules/user'

const COLLECTION_NAME = 'words'

type WordsCollection = {
    [uid: string]: {
        [collectionName: string]: Words
    }
}

export class WordsFirestoreCollection implements IWordsCollection {
    private readonly _collection: firebase.firestore.CollectionReference<WordsCollection>

    constructor() {
        this._collection = firebase.firestore().collection(COLLECTION_NAME) as firebase.firestore.CollectionReference<WordsCollection>
    }

    private get wordCollection() {
        const userStore = useUserStoreWithOut()

        if (!userStore.profileData || !userStore.customData){
            throw new Error('User data not initialized')
        }

        return this._collection
            .doc(userStore.profileData.uid)
            .collection(this.getCollectionName(userStore.customData.activeLearningLanguage, userStore.customData.nativeLanguage))
    }

    private getCollectionName = (sourceLanguageId: number, targetLanguageId: number) => `${sourceLanguageId}_${targetLanguageId}`

    public items = async (): Promise<Words | null> => {
        const items: Words = {}
        const querySnapshot = await this.wordCollection.get()

        querySnapshot.forEach(doc => {
            items[doc.id] = doc.data() as Word
        })

        return items
    }

    public create = async (word: string, wordData: Word) => {
        return await this.wordCollection
            .doc(word)
            .set(wordData)
    }

    public update = async (word: string, wordData: Word) => {
        return await this.wordCollection
            .doc(word)
            .update(wordData)
    }

    public delete = async (word: string): Promise<void> => {
        return await this.wordCollection
            .doc(word)
            .delete()
    }
}
