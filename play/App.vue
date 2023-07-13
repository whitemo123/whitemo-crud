<script setup lang="ts">
import {ref} from "vue";
import { ICommonColumn } from "whitemo-crud-element/es/types/common";

const queryParam = ref<any>({
  page: 1,
  limit: 10,
})
const column = ref<ICommonColumn[]>([
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

const search = () => {
  console.log(111)
}
</script>

<template>
  <div>
    {{queryParam}}
    <m-search v-model="queryParam" size="" :column="column" @search="search" />
  </div>
</template>

<style scoped>

</style>
