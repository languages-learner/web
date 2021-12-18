import { onUnmounted, ref, Ref } from "vue";
import { userCollection } from '@/plugins/firebase'
import User from '@/models/User'

export const createUser = async (user: Omit<User, 'id'>): Promise<string> => {
    const { id } = await userCollection.add(user)

    return id
}

export const getUser = async (id: string): Promise<User | null> => {
    const user = await userCollection.doc(id).get()

    return user.exists ? user.data() as User : null
}

export const updateUser = (id: string, user: Omit<User, 'id'>): Promise<void> => {
    return userCollection.doc(id).update(user)
}

export const deleteUser = async (id: string): Promise<void> => {
    return await userCollection.doc(id).delete()
}

export const useLoadUsers = (): Ref<User[]> => {
    const users: Ref<User[]> = ref([])
    const close = userCollection.onSnapshot(snapshot => {
        users.value = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data() as Omit<User, 'id'>
        }))
    })
    onUnmounted(close)

    return users
}
