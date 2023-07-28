<script setup lang="ts">
/**
 * @name: 视频组件
 * @author: itmobai
 * @date: 2023-07-15 14:42
 * @description：视频组件
 * @update: 2023-07-15 14:42
 */
import {ref, useAttrs, watch, onMounted, computed} from "vue";
import type { CSSProperties, StyleValue } from 'vue'
import "../style/index.scss"
import { VideoProps } from "./video";

defineOptions({name: "m-video"})
const props = withDefaults(defineProps<VideoProps>(), {

})
// 属性大全
const attrs = useAttrs()

// 监听video src资源
watch(() => props.src, () => {

})
</script>

<template>
  <div ref="container" class="m-video">
    <video
      v-if="src !== undefined"
      v-bind="attrs"
      :src="src"
      :controls="false"
    />
  </div>
</template>
