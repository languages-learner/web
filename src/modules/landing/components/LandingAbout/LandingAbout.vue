<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
    <div>
        © {{ currentYear }}.
        <n-a
            href="https://github.com/languages-learner/web"
            target="_blank">languages-learner/web</n-a>.
        {{ $t('developed_by') }}
        <n-a
            href="https://github.com/kvestus"
            target="_blank">Aleksandr Chernigin</n-a>
    </div>
</template>
