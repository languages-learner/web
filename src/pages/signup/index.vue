<script setup lang="ts">
import Authenticate from '@/modules/authenticate/components/Authenticate.vue'
import { PageEnum } from '@/enums/pageEnum'
</script>

<template>
    <Authenticate :type="PageEnum.BASE_SIGNUP" />
</template>

