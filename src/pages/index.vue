<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const {
    locale: selectedLocale,
    availableLocales
} = useI18n()
</script>

<template>
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
    margin-top: 60px;
    color: #2c3e50;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
