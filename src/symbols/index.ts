import { InjectionKey } from 'vue';

import { UserFirestoreCollection } from "@/services/UserFirestoreCollection";

export const UserFirestoreCollectionKey: InjectionKey<UserFirestoreCollection> = Symbol('UserFirestoreCollection')
