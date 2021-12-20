<script setup lang="ts">
import Navigation from '@/components/Navigation.vue'

import { useUserStore } from '@/store/user'
import { useI18n } from 'vue-i18n'

const store = useUserStore()
store.fetchProfile()

const t = useI18n()
const selectedLocale = t.locale
const { availableLocales } = t
</script>

<template>
    <Navigation />
    <p>{{ store.profileData?.email ?? '' }}</p>
    <p>{{ $t('message.hello') }}</p>
    <form>
        <label>{{ $t('language') }} - </label>
        <select v-model="selectedLocale">
            <option
                v-for="(locale, index) in availableLocales"
                :key="`locale-${index}`"
                :value="locale">
                {{ locale }}
            </option>
        </select>
    </form>
    <p>{{ $t('translate') }}: {{ $t('hello') }}</p>
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
