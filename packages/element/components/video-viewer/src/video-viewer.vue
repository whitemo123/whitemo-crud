<script lang="ts" setup>
/**
 * @name: 视频预览
 * @author: itmobai
 * @date: 2023-07-31 15:33
 * @description：视频预览
 * @update: 2023-07-31 15:33
 */
import { computed, ref, getCurrentInstance, inject, unref } from "vue"
import type { InjectionKey, Ref } from 'vue'
import { VideoViewerProps } from "./video-viewer"
import "../style/index.scss"

defineOptions({name: "m-video-viewer"})

const props = withDefaults(defineProps<VideoViewerProps>(), {
  // 初始预览索引
  initialIndex: 0,
  // image 不插入至 body 元素上
  teleported: false,
  // 点击遮罩层不关闭
  hideOnClickModal: false,
  // 无限循环
  infinite: true
})

// 视频ref数组
const videoRefs = ref<HTMLVideoElement[]>([])

// 当前预览索引
const activeIndex = ref<number>(props.initialIndex)

const emits = defineEmits<{
  (e: "close"): void;
}>()

const transform = ref({
  scale: 1,
  deg: 0,
  offsetX: 0,
  offsetY: 0,
  enableTransition: false,
})

/**
 * 是否单个
 */
const isSingle = computed(() => {
  const { urlList } = props
  return urlList.length <= 1
})

/**
 * 是否第一个
 */
const isFirst = computed(() => {
  return activeIndex.value === 0
})

/**
 * 是否下一个
 */
const isLast = computed(() => {
  return activeIndex.value === props.urlList.length - 1
})

const videoStyle = computed(() => {
  const { scale, deg, offsetX, offsetY, enableTransition } = transform.value
  let translateX = offsetX / scale
  let translateY = offsetY / scale

  switch (deg % 360) {
    case 90:
    case -270:
      ;[translateX, translateY] = [translateY, -translateX]
      break
    case 180:
    case -180:
      ;[translateX, translateY] = [-translateX, -translateY]
      break
    case 270:
    case -90:
      ;[translateX, translateY] = [-translateY, translateX]
      break
  }

  const style: any = {
    transform: `scale(${scale}) rotate(${deg}deg) translate(${translateX}px, ${translateY}px)`,
    transition: enableTransition ? 'transform .3s' : '',
  }
  style.maxWidth = style.maxHeight = '100%'
  return style
})

/**
 * 关闭预览模式
 */
const hide = () => {
  if (videoRefs.value.length) {
    videoRefs.value.forEach(video => {
      video.pause()
    })
  }
  emits('close')
}

/**
 * 设置当前预览
 * @param index 
 */
const setActiveItem = (index: number) => {
  const len = props.urlList.length
  activeIndex.value = (index + len) % len
}

/**
 * 预览上一个
 */
const prev = () => {
  if (isFirst.value && !props.infinite) return
  controlVideo(false)
  setActiveItem(activeIndex.value - 1)
}

/**
 * 预览下一个
 */
const next = () => {
  if (isLast.value && !props.infinite) return
  controlVideo(true)
  setActiveItem(activeIndex.value + 1)
}

/**
 * 控制视频
 */
const controlVideo = (isNext: boolean) => {
  const video = videoRefs.value[activeIndex.value]
  video.pause()
  let _video;
  const len = props.urlList.length
  if (isNext) {
    _video = videoRefs.value[((activeIndex.value + 1) + len) % len]
  } else {
    _video = videoRefs.value[((activeIndex.value - 1) + len) % len]
  }
  _video.play()
}
</script>

<template>
  <teleport to="body" :disabled="!teleported">
    <transition name="viewer-fade" appear>
      <div
        ref="wrapper"
        :tabindex="-1"
        class="video-viewer-wrapper"
      >
        <div class="video-viewer-mask" @click.self="hideOnClickModal && hide()" />
        <!-- CLOSE -->
        <span class="video-viewer-btn video-viewer-close" @click="hide">
          <el-icon><Close /></el-icon>
        </span>
        <!-- ARROW -->
        <template v-if="!isSingle">
          <span class="video-viewer-btn video-viewer-prev" :class="(!props.infinite && isFirst) ? 'disabled' : ''" @click="prev">
            <el-icon><ArrowLeft /></el-icon>
          </span>
          <span class="video-viewer-btn video-viewer-next" :class="(!props.infinite && isLast) ? 'disabled' : ''" @click="next">
            <el-icon><ArrowRight /></el-icon>
          </span>
        </template>
        <!-- CANVAS -->
        <div class="video-viewer-canvas">
          <video
            v-for="(url, i) in urlList"
            v-show="i === activeIndex"
            :ref="el => (videoRefs[i] = el as HTMLVideoElement)"
            :key="url"
            :src="url"
            :style="videoStyle"
            controls
          />
        </div>
      </div>
    </transition>
  </teleport>
</template>