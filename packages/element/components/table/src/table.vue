<script setup lang="ts">
/**
 * @name: table
 * @author: itmobai
 * @date: 2023-07-13 17:35
 * @description：table
 * @update: 2023-07-13 17:35
 */
import {computed, useAttrs} from "vue";
import {TableColumn, TableProps} from "./table";
import "../style/index.scss"

defineOptions({name: "m-table"})

const attrs = useAttrs()
const props = withDefaults(defineProps<TableProps>(), {
  total: 0,
  page: 1,
  limit: 10,
  select: [],
  loading: false
})

const emits = defineEmits<{
  // 触发搜索
  (e: "search"): void;
  // 更新limit
  (e: "update:limit", limit: number): void;
  // 更新page
  (e: "update:page", page: number): void;
}>()

/**
 * 获取table-column属性
 * @param item
 */
const getTableColumnAttr = (item: TableColumn) => {
  if (item.type === "index") {
    // 索引
    return {
      type: "index",
      width: "50",
      align: "center"
    }
  }
  if (item.type === "selection") {
    // 多选
    return {
      type: "selection",
      width: "50",
      align: "center"
    }
  }
  // 默认格式
  return {
    label: item.label,
    prop: item.prop,
    align: item.align || "left"
  }
}

/**
 * 是否文本展示
 * @param item 列配置
 */
const isTextRender = (item: TableColumn) => {
  return !item.type || item.type === 'text' || item.type === 'textarea' || item.type === 'number' || item.type === 'password'
}
/**
 * 是否字典渲染
 * @param item 列配置
 */
const isDicRender = (item: TableColumn) => {
  return item.type === 'select' || item.type === 'radio' || item.type === 'switch'
}
/**
 * 通过value获取字典对象
 * @param data 值
 * @param col 列配置
 */
const getDicDataByValue = (data: string | number, col: TableColumn) => {
  if (data === null || data === undefined || !col.dicData || !col.dicData.length) {
    return {
      color: '',
      label: col.default || '--'
    }
  }
  const item = col.dicData.find(i => i.value === data)
  if (!item) {
    return {
      color: '',
      label: col.default || '--'
    }
  }
  return {
    color: item.color || '',
    label: item.label || col.default || '--'
  }
}

/**
 * 页大小改变
 */
const handleSizeChange = (size: number) => {
  emits("update:limit", size)
  emits("search")
}

/**
 * 当前页改变
 */
const handleCurrentChange = (page: number) => {
  emits("update:page", page)
  emits("search")
}
/**
 * 获取图片集合
 * @param value 图片值
 * @param col 配置
 */
const getRowImgs = (value: string, col: TableColumn) => {
  if (!value || !col) {
    return []
  }
  return value.split(col.imgSuffix || ';').map(item => `${col.imgPrefix || ''}${item}`)
}
</script>

<template>
  <div class="m-table">
    <el-table :data="data" style="width: 100%" v-bind="attrs" v-loading="loading">
      <el-table-column
        v-for="(item, index) in props.column"
        :key="index"
        v-bind="getTableColumnAttr(item)"
      >
        <template v-if="item.type !== 'index' && item.type !== 'selection'" v-slot:default="{row, $index}">
          <!-- 插槽 -->
          <slot v-if="item.slot" :name="item.prop" v-bind="{row, $index}"/>
          <!-- 文字输出 -->
          <template v-else-if="isTextRender(item)">
            {{ row[item.prop] === null ? (item.default || '--') : row[item.prop] }}
          </template>
          <!-- 字典渲染 -->
          <span
            v-else-if="isDicRender(item)"
            :style="{color: getDicDataByValue(row[item.prop], item)['color']}"
          >
            {{ getDicDataByValue(row[item.prop], item)['label'] }}
          </span>
          <!-- 图片渲染 -->
          <template v-else-if="item.type === 'image'">
            <el-image
              v-if="getRowImgs(row[item.prop], item).length"
              :style="{width: item.imgWidth || '100px', height: item.imgHeight || '100px'}"
              :src="getRowImgs(row[item.prop], item)[0]"
              :zoom-rate="1.2"
              :preview-src-list="getRowImgs(row[item.prop], item)"
              fit="cover"
            />
            <span v-else>{{item.default || '--'}}</span>
          </template>
          <!-- 视频渲染 -->
          <template v-else-if="item.type === 'video'">
            <m-video
              :src="row[item.prop]"
            >

            </m-video>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="total" class="pagination">
      <el-pagination
        :current-page="page"
        :page-size="limit"
        :page-sizes="[10, 25, 50, 100]"
        :small="!!(size && size === 'small')"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :background="true"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
