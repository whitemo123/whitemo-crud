<script lang="ts" setup>
/**
 * @name: 视频预览
 * @author: itmobai
 * @date: 2023-07-31 15:33
 * @description：视频预览
 * @update: 2023-07-31 15:33
 */
import { computed, ref } from "vue"
import { VideoViewerProps } from "./video-viewer"
import "../style/index.scss"
import { useZIndex } from "element-plus";

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

// 当前预览索引
const activeIndex = ref(props.initialIndex)

const emits = defineEmits<{
  (e: "close"): void;
}>()

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

// z-index
const { nextZIndex } = useZIndex()

/**
 * 关闭预览模式
 */
const hide = () => {
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
  setActiveItem(activeIndex.value - 1)
}

/**
 * 预览下一个
 */
const next = () => {
  if (isLast.value && !props.infinite) return
  setActiveItem(activeIndex.value + 1)
}
</script>

<template>
  <teleport to="body" :disabled="!teleported">
    <transition name="viewer-fade" appear>
      <div
        ref="wrapper"
        :tabindex="-1"
        class="video-viewer-wrapper"
        :style="{ zIndex: nextZIndex.toString() }"
      >
        <div class="video-viewer-mask" @click.self="hideOnClickModal && hide()" />
        <!-- CLOSE -->
        <span class="video-viewer-btn video-viewer-close" @click="hide">
          <el-icon><Close /></el-icon>
        </span>
        <!-- ARROW -->
        <template v-if="!isSingle">
          <span class="btn prev" :class="(!props.infinite && isFirst) ? 'disabled' : ''" @click="prev">
            <el-icon><ArrowLeft /></el-icon>
          </span>
          <span class="btn prev" :class="(!props.infinite && isLast) ? 'disabled' : ''" @click="next">
            <el-icon><ArrowRight /></el-icon>
          </span>
        </template>
        <!-- CANVAS -->
        <div class="video-viewer-canvas">
          <img
            v-for="(url, i) in urlList"
            v-show="i === activeIndex"
            :ref="(el) => (imgRefs[i] = el as HTMLImageElement)"
            :key="url"
            :src="url"
            :style="imgStyle"
            class="video-viewer-img"
            @load="handleImgLoad"
            @error="handleImgError"
            @mousedown="handleMouseDown"
          />
        </div>
      </div>
    </transition>
  </teleport>
</template>