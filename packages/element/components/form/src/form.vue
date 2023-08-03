<script lang="ts" setup>
/**
 * @name: 表单组件
 * @author: itmobai
 * @date: 2023-08-02 13:36
 * @description：表单组件
 * @update: 2023-08-02 13:36
 */
import { ref, computed } from "vue"
import type { FormProps, FormColumn } from "./form"
import "../style/index.scss"
import { externalAttr } from "../../../constants/bind";
import type { FormInstance } from 'element-plus'
defineOptions({name: "m-form"})

// 表单属性
const props = withDefaults(defineProps<FormProps>(), {
  labelWidth: '80px',
  // 表单加载状态
  loading: false
})

const emits = defineEmits<{
  (e: "update:modelValue", data: any): void;
}>()

// 表单ref实例
const formRef = ref<FormInstance>()

// 表单项
const formColumn = computed(() => {
  const columns: FormColumn[] = []
  props.column.forEach((item, index) => {
    // 不必要的类型进行过滤
    if (item.type !== "index" && item.type !== "selection") {
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
        item.span = 12
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
  if (!type || type === "" || (type !== "image" && type !== "video")) {
    // 渲染名字
    let name = ""
    switch (type) {
      case "text":
      case "number":
      case "password":
      case "textarea":
        name = "input"
        break;
      case "select":
        name = "select"
        break
      case "radio":
        name = "radio"
        break
      case "switch":
        name = "switch"
        break;
      case "date":
      case "daterange":
        name = "date-picker";
        break;
      default:
        name = "input";
        break;
    }
    // element组件
    return "el-" + name
  } else {
    // 业务组件
    let name = ""
    switch (type) {
      case "image":
        name = "upload"
        break;
      case "video":
        name = "video"
        break;
    }
    return "m-" + name
  }
}

/**
 * 获取组件属性
 * @param item
 */
const getComAttribute = (item: FormColumn) => {
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
      if (item.type === "switch") {
        // 切换
        if (item.dicData && item.dicData.length >= 2) {
          attr["active-value"] = item.dicData[0].value
          attr["inactive-value"] = item.dicData[1].value
        }
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
 * 校验表单
 */
const validForm = () => {
  return new Promise(resolve => {
    formRef.value?.validate(valid => {
      resolve(valid)
    })
  })
}


/**
 * 清空form表单数据
 */
const clear = () => {
  // 清空表单校验规则
  formRef.value?.clearValidate()
  // 清空表单数据
  formRef.value?.resetFields()
  // 更新form表单数据
  emits("update:modelValue", {})
}

/**
 * 导出函数
 */
defineExpose({
  validForm,
  clear
})
</script>

<template>
  <el-form
    ref="formRef"
    :model="modelValue"
    :labelWidth="labelWidth"
    :disabled="loading"
  >
    <el-row :gutter="0">
      <el-col :span="colItem.span" v-for="(colItem, colIndex) in formColumn" :key="colIndex">
        <el-form-item
          :label="colItem.label"
          :prop="colItem.prop"
          :rules="colItem.rules || []"
        >
          <template v-if="colItem.slot">
            <slot :name="colItem.prop" v-bind="{row: modelValue}" />
          </template>
          <!-- 下拉框 -->
          <el-select
            v-else-if="getComposeName(colItem.type) === 'el-select'"
            v-model="modelValue[colItem.prop as string]"
            v-bind="getComAttribute(colItem)"
            style="width: 100%;"
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
          <!-- 单选框 -->
          <el-radio-group
            v-else-if="getComposeName(colItem.type) === 'el-radio'"
            v-model="modelValue[colItem.prop as string]"
            style="width: 100%;"
            v-bind="getComAttribute(colItem)"
          >
            <el-radio v-for="(dic, dicIndex) in (colItem.dicData || [])" :key="dicIndex" :label="dic.value">{{ dic.label }}</el-radio>
          </el-radio-group>
          <component
            v-else
            :is="getComposeName(colItem.type)"
            style="width: 100%;"
            v-model="modelValue[colItem.prop as string]"
            v-bind="getComAttribute(colItem)"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>