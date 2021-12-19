import { UserFirestoreCollection } from "@/services/UserFirestoreCollection";
import { UserFirestoreCollectionKey } from '@/symbols'

export default {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    install: (app: any): void => {
        app.provide(UserFirestoreCollectionKey, new UserFirestoreCollection())
    }
}
