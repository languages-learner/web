import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import CollectionReference = firebase.firestore.CollectionReference;
import Query = firebase.firestore.Query;
import DocumentData = firebase.firestore.DocumentData;
import type { FirestoreCollectionFilter } from '@/services/dbstore/firestore/types/FirestoreCollectionFilter'

export abstract class BaseFirestoreCollection<T> {
    protected readonly _collection: firebase.firestore.CollectionReference<T>

    protected constructor(collectionName: string) {
        this._collection = firebase.firestore().collection(collectionName) as firebase.firestore.CollectionReference<T>
    }

    protected setFilters(collection: CollectionReference, filters: Array<FirestoreCollectionFilter>): Query<DocumentData> {
        if (!filters.length) return collection

        let query: Query<DocumentData> = collection

        filters.forEach(filter => {
            const property = filter.property === 'documentId' ? firebase.firestore.FieldPath.documentId() : filter.property
            query = query.where(property, filter.type, filter.value)
        })

        return query
    }
}
