<script setup lang="ts">
import { reactive } from 'vue'
import { useDbStore } from '@/plugins/services'

const { create: createUser } = useDbStore().UserCollection

const form = reactive({
    name: '',
    email: ''
})
const onSubmit = async () => {
    await createUser({ ...form })
    form.name = ''
    form.email = ''
}
</script>

<template>
    <div class="user-create">
        <form @submit.prevent="onSubmit">
            <div class="user-create_prop">
                <label>Name</label>
                <input v-model="form.name" required />
            </div>

            <div class="user-create_prop">
                <label>Email</label>
                <input
                    v-model="form.email"
                    type="email"
                    required
                />
            </div>

            <button type="submit">
                Create User
            </button>
        </form>
    </div>
</template>

<style scoped lang="scss">
.user-create {
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
