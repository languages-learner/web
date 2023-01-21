<script lang="ts" setup>
import { computed, unref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/modules/user'

const { profileData } = storeToRefs(useUserStore())
const name = computed(() => unref(profileData)?.displayName ?? 'U')
const photoURL = computed(() => unref(profileData)?.photoURL ?? '')
</script>

<template>
    <n-avatar :src="photoURL">
        <template #fallback>
            <n-row
                align-items="center"
                justify-content="center">
                {{ name[0] }}
            </n-row>
        </template>
    </n-avatar>
</template>
