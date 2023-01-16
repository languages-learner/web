import {
    Ref,
    onUnmounted,
    ref
} from 'vue'
import firebase from 'firebase/app'
import 'firebase/firestore'
import type { ICollection } from '@/services/dbstore/common/ICollection'

export abstract class BaseFirestoreCollection<T> implements ICollection<T>{
    protected readonly _collection: firebase.firestore.CollectionReference<Omit<T, 'id'>>

    protected constructor(collectionName: string) {
        this._collection = firebase.firestore().collection(collectionName) as firebase.firestore.CollectionReference<Omit<T, 'id'>>
    }

    public create = async (id: string, item: Omit<T, 'id'>): Promise<void> => {
        await this._collection.doc(id).set(item)
    }

    public get = async (id: string): Promise<T | null> => {
        const item = await this._collection.doc(id).get()

        return item.exists ? item.data() as T : null
    }

    public update = async (id: string, item: Omit<T, 'id'>): Promise<void> => {
        return await this._collection.doc(id).update(item)
    }

    public delete = async (id: string): Promise<void> => {
        return await this._collection.doc(id).delete()
    }

    get items(): Ref<T[]> {
        const items: Ref<T[]> = ref([])
        const close = this._collection.onSnapshot(snapshot => {
            items.value = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data() as T
            }))
        })
        onUnmounted(close)

        return items
    }
}
