<script lang="ts" setup>
const { profileData } = storeToRefs(useUserStore())
const name = computed(() => unref(profileData)?.displayName ?? unref(profileData)?.email ?? 'U')
const photoURL = computed(() => unref(profileData)?.photoURL ?? '')
</script>

<template>
    <n-avatar
        v-if="photoURL"
        :src="photoURL">
        <template #fallback>
            <n-row
                align-items="center"
                justify-content="center">
                {{ name[0] }}
            </n-row>
        </template>
    </n-avatar>
    <n-avatar v-else>
        {{ name[0] }}
    </n-avatar>
</template>
