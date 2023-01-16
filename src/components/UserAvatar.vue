<script lang="ts" setup>
import { NAvatar } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/modules/user'
import {
    computed,
    ref,
    unref
} from 'vue'

const { profileData } = storeToRefs(useUserStore())
const name = computed(() => unref(profileData)?.displayName ?? 'U')

const wasErrorLoadingPicture = ref(false)
const loadPictureErrorHandler = () => {
    wasErrorLoadingPicture.value = true
}

const usePhotoURL = computed(() => !unref(wasErrorLoadingPicture) && unref(profileData)?.photoURL)
const photoURL = computed(() => unref(profileData)?.photoURL ?? '')
</script>

<template>
    <n-avatar
        v-if="usePhotoURL"
        @error="loadPictureErrorHandler"
        :src="photoURL"
        v-bind="$attrs"
    />
    <n-avatar
        v-else
        v-bind="$attrs"
    >
        {{ name[0] }}
    </n-avatar>
</template>
