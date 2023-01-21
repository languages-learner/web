import type { EFirestoreCollectionFilterType } from '@/services/dbstore/firestore/enums/EFirestoreCollectionFilterType'

type PropertyType = string | 'documentId'

type FirestoreCollectionComparisonFilter = {
    type: EFirestoreCollectionFilterType.LESS_THAN |
    EFirestoreCollectionFilterType.LESS_THAN_OR_EQUAL_TO |
    EFirestoreCollectionFilterType.EQUAL_TO |
    EFirestoreCollectionFilterType.GREATER_THAN |
    EFirestoreCollectionFilterType.GREATER_THAN_OR_EQUAL_TO |
    EFirestoreCollectionFilterType.NOT_EQUAL_TO,
    property: PropertyType
    value: string | number | boolean
}

type FirestoreCollectionArrayContainsFilter = {
    type: EFirestoreCollectionFilterType.ARRAY_CONTAINS
    property: PropertyType
    value: string | number | boolean
}

type FirestoreCollectionArrayCollectionsFilter = {
    type: EFirestoreCollectionFilterType.ARRAY_CONTAINS_ANY |
        EFirestoreCollectionFilterType.IN |
        EFirestoreCollectionFilterType.NOT_IN
    property: PropertyType
    value: Array<string | number | boolean>
}

export type FirestoreCollectionFilter =
    FirestoreCollectionComparisonFilter |
    FirestoreCollectionArrayContainsFilter |
    FirestoreCollectionArrayCollectionsFilter
