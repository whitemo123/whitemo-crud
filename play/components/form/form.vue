<script lang="ts" setup>
import { ref } from "vue"
import { CommonColumn } from "whitemo-crud-element/es/types/common";

const column = ref<CommonColumn[]>([
  {
    label: "索引",
    type: "index"
  },
  {
    label: "关键字",
    prop: "keyword",
    sort: 2,
    type: "text"
  },
  {
    label: "姓名",
    prop: "name",
    sort: 1,
    type: "textarea"
  },
  {
    label: "年龄",
    prop: "age",
    type: "number"
  },
  {
    label: "单日期",
    prop: "time",
    type: "date"
  },
  {
    label: "多日期",
    prop: "times",
    type: "daterange"
  },
  {
    label: "单选",
    prop: "radio",
    type: "radio",
    dicData: [
      {
        label: "禁用",
        value: 2
      },
      {
        label: "启用",
        value: 1
      }
    ]
  },
  {
    label: "下拉",
    prop: "select",
    type: "select",
    dicData: [
      {
        label: "禁用",
        value: 2
      },
      {
        label: "启用",
        value: 1
      }
    ]
  },
  {
    label: "切换",
    prop: "switch",
    type: "switch",
    slot: true,
    dicData: [
      {
        label: "禁用",
        value: 2
      },
      {
        label: "启用",
        value: 1
      }
    ],
  }
])

const form = ref<any>({})
</script>

<template>
  <div>
    <m-form v-model="form" :column="column" />
  </div>
</template>

<style lang="scss" scoped></style>