<script setup lang="ts">
/**
 * @name: 视频组件
 * @author: itmobai
 * @date: 2023-07-15 14:42
 * @description：视频组件
 * @update: 2023-07-15 14:42
 */
import {ref, useAttrs, watch, onMounted} from "vue";
import "../style/index.scss"
import { VideoProps } from "./video";

defineOptions({name: "m-video"})
const props = withDefaults(defineProps<VideoProps>(), {

})
const attrs = useAttrs()
const coverSrc = ref<string | undefined>()

/**
 * 获取视频封面
 * @param url 视频地址
 * @param time 事件
 */
const getVideoCover = (url: string, time: number): Promise<string> => {
  return new Promise(resolve => {
    const video = document.createElement('video');
    video.src = url;

    video.onloadeddata = function() {
      video.currentTime = time;

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext('2d');
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);

      const dataURL = canvas.toDataURL('image/png');
      // 清理资源
      video.onloadeddata = null;
      video.src = '';

      resolve(dataURL)
    }
  })
}

const loadVideo = async () => {
  coverSrc.value = await getVideoCover(props.src, 1)
}

// 监听video src资源
watch(() => props.src, () => {

})

onMounted(() => {
  loadVideo()
})
</script>

<template>
  <div ref="container" class="m-video">
    <img
      v-if="coverSrc !== undefined"
      v-bind="attrs"
      :src="coverSrc"
    />
<!--    <div v-if="isLoading" class="m-video-wrapper">-->
<!--      <slot name="placeholder">-->
<!--        <div :class="ns.e('placeholder')" />-->
<!--      </slot>-->
<!--    </div>-->
<!--    <template v-if="preview">-->

<!--    </template>-->
  </div>
</template>
