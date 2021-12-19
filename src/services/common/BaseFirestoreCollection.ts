import { onUnmounted, ref, Ref } from 'vue';
import firebase from 'firebase';

export abstract class BaseFirestoreCollection<T> {
    private readonly _collection: firebase.firestore.CollectionReference<Omit<T, 'id'>>

    protected constructor(collectionName: string) {
        this._collection = firebase.firestore().collection(collectionName) as firebase.firestore.CollectionReference<Omit<T, 'id'>>
    }

    public create = async (item: Omit<T, 'id'>): Promise<string> => {
        const { id } = await this._collection.add(item)

        return id
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
