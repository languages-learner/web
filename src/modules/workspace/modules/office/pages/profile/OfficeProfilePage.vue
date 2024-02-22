<script setup lang="ts">
import UserAvatar from '@/modules/workspace/components/UserAvatar/UserAvatar.vue'

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
                    class="office-profile__user">
                    <n-space
                        vertical
                        align="center">
                        <UserAvatar
                            round
                            :size="64" />
                        <n-text :data-test="EDataTest.office_profile_email">
                            {{ profileData?.email }}
                        </n-text>
                    </n-space>
                </n-card>
                <n-skeleton
                    v-else
                    class="office-profile__user"></n-skeleton>
            </n-grid-item>
            <n-grid-item span="3">
                <n-space vertical>
                    <n-card
                        v-if="isUserDataLoaded"
                        size="small">
                        <n-row
                            align-items="flex-end"
                            class="office-profile__user-level-container">
                            <n-row class="office-profile__user-level-label">
                                <n-h4>
                                    <n-text type="success">
                                        {{ $t('level') }}
                                    </n-text>
                                </n-h4>
                                <n-progress
                                    type="line"
                                    :show-indicator="false"
                                    status="success"
                                    :percentage="20"
                                >
                                </n-progress>
                            </n-row>
                            <n-row
                                align-items="center"
                                justify-content="center"
                                class="office-profile__user-level">
                                <span class="office-profile__user-level-value">15</span>
                            </n-row>
                        </n-row>
                    </n-card>
                    <n-skeleton
                        v-else
                        :height="72"></n-skeleton>
                    <n-card
                        v-if="isUserDataLoaded"
                        size="small">
                        <n-h4>
                            <n-text type="info">
                                {{ $t('language_level') }}
                            </n-text>
                        </n-h4>
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
@import "office-profile";
</style>
