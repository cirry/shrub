<template>
    <n-input round size="large" placeholder="搜索">
        <template #prefix>
            <n-icon :component="Search"/>
        </template>
    </n-input>
</template>

<script setup lang="ts">
import { Search } from '@vicons/fa'
</script>


<style scoped>

</style>
