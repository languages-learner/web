<script setup lang="ts">
import { reactive, computed, onMounted, unref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { injectStrict } from '@/utils/injection'
import { UserFirestoreCollectionKey } from '@/symbols'

const {
    get: getUser,
    update: updateUser,
} = injectStrict(UserFirestoreCollectionKey)

const router = useRouter()
const route = useRoute()
const userId = computed(() => String(route.params.id))
const form = reactive({
    name: '',
    email: ''
})
onMounted(async () => {
    const user = await getUser(unref(userId))
    if (!user) return
    form.name = user.name
    form.email = user.email
})
const onSubmit = async () => {
    await updateUser(unref(userId), { ...form })
    await router.push({ name: 'users' })
    form.name = ''
    form.email = ''
}
</script>

<template>
    <div class="user-edit">
        <form @submit.prevent="onSubmit">
            <div class="user-edit_prop">
                <label>Name</label>
                <input v-model="form.name" required />
            </div>

            <div class="user-edit_prop">
                <label>Email</label>
                <input
                    v-model="form.email"
                    type="email"
                    required
                />
            </div>

            <button type="submit">
                Update
            </button>
        </form>
    </div>
</template>

<style scoped lang="scss">
.user-edit {
    &_prop {
        label {
            margin-right: 10px;
        }
    }

    &_prop + &_prop {
        margin-top: 5px;
    }

    button {
        margin-top: 5px;
    }
}
</style>
