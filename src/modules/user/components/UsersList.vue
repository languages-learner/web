<script setup lang="ts">
import { injectStrict } from '@/utils/injection'
import { UserFirestoreCollectionKey } from '@/symbols'

const {
    delete: deleteUser,
    items: users
} = injectStrict(UserFirestoreCollectionKey)
const editRoute = (id: string) => ({
    name: 'users-edit-id',
    params: { id }
})
</script>

<template>
    <div class="users-list">
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users" :key="index">
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>
                        <router-link :to="editRoute(user.id)">
                            <button>
                                Edit
                            </button>
                        </router-link>
                        <button @click="deleteUser(user.id)">
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<style scoped lang="scss">
.users-list {
    display: flex;
    justify-content: center;
}
</style>
