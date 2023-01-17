<script setup lang="ts">
import { NGradientText, NRow } from 'naive-ui'
</script>

<template>
    <div class="main-page">
        <n-row
            class="main-page_title"
            justify-content="center"
            align-items="center">
            <n-gradient-text
                class="main-page-title_text"
                :size="100"
                type="success">
                Languages<br/>
                Learner
            </n-gradient-text>
        </n-row>
    </div>
</template>

<style lang="scss" scoped>
@import "styles/main";
</style>
