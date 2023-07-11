<script setup lang="ts">
/**
 * @name: 列表搜索组件
 * @author: itmobai
 * @date: 2023-07-09 11:27
 * @description：列表搜索组件
 * @update: 2023-07-09 11:27
 */
import { SearchProps } from "./search"
defineOptions({name: 'm-search'})

const props = defineProps<SearchProps>()
</script>

<template>
  <div>我是搜索{{ props.type }}</div>
</template>

<style scoped>

</style>
