<script setup lang="ts">
import Authenticate from '@/modules/authenticate/components/Authenticate.vue'
import { EPageName } from '@/enums/EPageName'
</script>

<template>
    <Authenticate :type="EPageName.SIGNIN" />
</template>

