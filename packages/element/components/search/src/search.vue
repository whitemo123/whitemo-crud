<script setup lang="ts">
/**
 * @name: 列表搜索组件
 * @author: itmobai
 * @date: 2023-07-09 11:27
 * @description：列表搜索组件
 * @update: 2023-07-09 11:27
 */
import { ref, computed } from "vue"
import "../style/index.scss"
import { externalAttr } from "../../../constants/bind"
import type { FormInstance } from 'element-plus'
import { SearchProps } from "./search"
import {CommonColumn} from "../../../types/common";

defineOptions({name: 'm-search'})

const props = withDefaults(defineProps<SearchProps>(), {
  labelWidth: "80px"
})

const emits = defineEmits<{
  // 更新v-model
  (e: "update:modelValue", data: any): void;
  // 搜索事件
  (e: "search"): void;
  // 重置事件
  (e: "reset"): void;
}>()

// 搜索表单ref
const formRef = ref<FormInstance>()
/**
 * 搜索配置项
 */
const searchColumn = computed(() => {
  const columns: CommonColumn[] = []
  props.column.forEach((item, index) => {
    // 不必要的类型进行过滤
    if (item.type !== "index" && item.type !== "selection" && item.type !== "image" && item.type !== "video") {
      // 赋值当前排序
      if (!item.sort) {
        item.sort = index + 1
      }
      // 赋值默认placeholder
      if (!item.placeholder && item.placeholder !== "") {
        item.placeholder = `请输入${item.label}`
      }
      // 赋值span
      if (!item.span) {
        if (item.type === "daterange") {
          item.span = 6
        } else {
          item.span = 4
        }
      }
      columns.push(item)
    }
  })
  // 根据sort排序
  columns.sort((a, b) => Number(a.sort) - Number(b.sort))
  return columns;
})
/**
 * 获取组件名字
 * @param type column type字段
 */
const getComposeName = (type: any) => {
  // 渲染名字
  let name = ""
  if (!type || type === "") {
    name = "input"
  } else {
    switch (type) {
      case "text":
      case "number":
      case "password":
      case "textarea":
        name = "input"
        break;
      case "select":
      case "radio":
      case "switch":
        name = "select"
        break;
      case "date":
      case "daterange":
        name = "date-picker";
        break;
    }
  }
  return `el-${name}`
}
/**
 * 获取组件属性
 * @param item
 */
const getComAttribute = (item: CommonColumn) => {
  let attr: any = {}
  for (const key in item) {
    if (key === "type") {
      if (item.type === "daterange") {
        // 日期范围选择器补充属性
        attr["type"] = "datetimerange"
        if (!attr["range-separator"]) attr["range-separator"] = "至"
        if (!attr["start-placeholder"]) attr["start-placeholder"] = "开始日期"
        if (!attr["end-placeholder"]) attr["end-placeholder"] = "结束日期"
        // 显示格式化
        attr["format"] = attr["format"] || "YYYY-MM-DD HH:mm:ss"
        // 输出格式化
        attr["value-format"] = attr["value-format"] || "YYYY-MM-DD HH:mm:ss"
      }
      if (item.type === "date") {
        // 日期选择器补充属性
        attr["type"] = "datetime"
        attr["placeholder"] = item.placeholder || "请选择日期"
        // 显示格式化
        attr["format"] = attr["format"] || "YYYY-MM-DD HH:mm:ss"
        // 输出格式化
        attr["value-format"] = attr["value-format"] || "YYYY-MM-DD HH:mm:ss"
      }
    }
    if (externalAttr.indexOf(key) === -1) {
      // @ts-ignore
      attr[key] = item[key]
    }
  }
  return attr
}
/**
 * 搜索
 */
const search = () => {
  if (props.modelValue["page"]) {
    emits("update:modelValue", {...props.modelValue, page: 1})
  }
  emits("search")
}

/**
 * 重置
 */
const reset = () => {
  formRef.value?.resetFields();
  props.modelValue.page && emits("update:modelValue", {...props.modelValue, page: 1})
  props.modelValue.limit && emits("update:modelValue", {...props.modelValue, limit: 10})
  emits("reset")
}
</script>

<template>
  <div class="w-search">
    <el-form
      ref="formRef"
      :model="modelValue"
      :inline="true"
      :size="size"
      :label-width="labelWidth"
    >
      <el-row :gutter="20">
        <el-col
          v-for="(colItem, colIndex) in searchColumn"
          :key="colIndex"
          :span="colItem.span"
        >
          <el-form-item
            :label="colItem.label"
            :prop="colItem.prop as string"
          >
            <template v-if="colItem.slot">
              <slot :name="colItem.prop" v-bind="{row: modelValue}" />
            </template>
            <el-select
              v-else-if="getComposeName(colItem.type) === 'el-select'"
              style="width: 100%"
              v-model="modelValue[colItem.prop]"
              v-bind="getComAttribute(colItem)"
              clearable
            >
              <el-option
                v-for="(dicItem, dicIndex) in colItem.dicData"
                :key="dicIndex"
                :label="dicItem.label"
                :value="dicItem.value"
              >
              </el-option>
            </el-select>
            <component
              v-else
              style="width: 100%"
              :is="getComposeName(colItem.type)"
              v-bind="getComAttribute(colItem)"
              v-model="modelValue[colItem.prop]"
              @keydown.enter="search"
            />
          </el-form-item>
        </el-col>
        <el-col
          :span="6"
        >
          <el-form-item>
            <el-button :size='size as "large" | "default" | "small"' icon="Search" type="primary" @click="search">查询</el-button>
            <el-button :size='size as "large" | "default" | "small"' icon="Delete" @click="reset">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
