<script setup lang="ts">
import Navigation from '@/components/Navigation.vue'
import Header from '@/components/Header.vue'

import { useI18n } from 'vue-i18n'

const t = useI18n()
const selectedLocale = t.locale
const { availableLocales } = t
</script>

<template>
    <Header />
    <Navigation />
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
