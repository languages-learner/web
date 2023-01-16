<script setup lang="ts">
import {
    NCard,
    NGrid,
    NGridItem,
    NProgress,
    NSkeleton,
    NSpace,
    NText
} from 'naive-ui'
import UserAvatar from '@/components/UserAvatar.vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/modules/user'

const { isUserDataLoaded, profileData } = storeToRefs(useUserStore())
</script>

<template>
    <div class="office-profile">
        <n-grid
            cols="5"
            :x-gap="16"
            item-responsive>
            <n-grid-item span="2">
                <n-card
                    v-if="isUserDataLoaded"
                    class="office-profile_user">
                    <n-space
                        vertical
                        align="center">
                        <UserAvatar
                            round
                            :size="64" />
                        <n-text>
                            {{ profileData?.email }}
                        </n-text>
                    </n-space>
                </n-card>
                <n-skeleton
                    v-else
                    class="office-profile_user"></n-skeleton>
            </n-grid-item>
            <n-grid-item span="3">
                <n-space
                    vertical
                    class="office-profile-information">
                    <n-card
                        v-if="isUserDataLoaded"
                        size="small">
                        <template #header>
                            <n-text type="primary">
                                {{ $t('level') }}
                            </n-text>
                        </template>
                        <n-grid
                            cols="5"
                            :x-gap="16"
                            item-responsive>
                            <n-grid-item span="4">
                                <n-progress
                                    type="line"
                                    :show-indicator="false"
                                    status="success"
                                    :percentage="20">
                                </n-progress>
                            </n-grid-item>
                            <n-grid-item span="1">
                                <div class="office-profile-information_user-level office-profile-information-user-level">
                                    <div class="office-profile-information-user-level_value">15</div>
                                </div>
                            </n-grid-item>
                        </n-grid>
                    </n-card>
                    <n-skeleton
                        v-else
                        :height="72"></n-skeleton>
                    <n-card
                        v-if="isUserDataLoaded"
                        size="small">
                        <template #header>
                            <n-text type="info">
                                {{ $t('language_level') }}
                            </n-text>
                        </template>
                        <n-text depth="3">Intermediate</n-text>
                    </n-card>
                    <n-skeleton
                        v-else
                        :height="86"></n-skeleton>
                </n-space>
            </n-grid-item>
        </n-grid>
    </div>
</template>

<style lang="scss" scoped>
@import "@/pages/styles/office-profile";
</style>
