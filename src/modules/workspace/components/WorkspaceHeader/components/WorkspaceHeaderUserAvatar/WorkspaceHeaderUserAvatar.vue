<script setup lang="ts">
import UserAvatar from '@/modules/workspace/components/UserAvatar/UserAvatar.vue'

const router = useRouter()
const { isUserDataLoaded } = storeToRefs(useUserStore())
const { signOut } = useAuthenticationService()
const { t } = useI18n()

const avatarDropdownMenuOptions = computed(() => ([
    {
        label: t('profile'),
        key: EPageName.OFFICE_PROFILE,
    },
    {
        key: 'header-divider',
        type: 'divider',
    },
    {
        label: t('settings'),
        key: EPageName.OFFICE_SETTINGS,
    },
    {
        label: t('sign_out'),
        key: 'sign_out',
    },
]))

const handleSelectAvatarDropdownMenuItem = (key: string) => {
    switch (key) {
    case EPageName.OFFICE_PROFILE:
    case EPageName.OFFICE_SETTINGS:
        router.push({ name: key })
        break
    case 'sign_out': signOut()
        break
    }
}
</script>

<template>
    <n-dropdown
        v-if="isUserDataLoaded"
        @select="handleSelectAvatarDropdownMenuItem"
        data-test-blackout
        trigger="hover"
        :options="avatarDropdownMenuOptions">
        <UserAvatar
            size="medium"
            :data-test="EDataTest.workspace_header_user_avatar" />
    </n-dropdown>
    <n-skeleton
        v-else
        :width="34"
        :sharp="false"
        size="medium" />
</template>
