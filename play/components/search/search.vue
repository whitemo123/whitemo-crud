<script setup lang="ts">
import {ref} from "vue";
import { CommonColumn } from "whitemo-crud-element/es/types/common";

const queryParam = ref<any>({
  page: 1,
  limit: 10,
})
const column = ref<CommonColumn[]>([
  {
    label: "关键字",
    prop: "keyword",
    sort: 2,
    type: "text"
  },
  // {
  //   label: "姓名",
  //   prop: "name",
  //   sort: 1,
  //   type: "textarea"
  // },
  // {
  //   label: "年龄",
  //   prop: "age",
  //   type: "number"
  // },
  // {
  //   label: "单日期",
  //   prop: "time",
  //   type: "date"
  // },
  // {
  //   label: "多日期",
  //   prop: "times",
  //   type: "daterange"
  // },
  // {
  //   label: "单选",
  //   prop: "radio",
  //   type: "radio",
  //   dicData: [
  //     {
  //       label: "禁用",
  //       value: 2
  //     },
  //     {
  //       label: "启用",
  //       value: 1
  //     }
  //   ]
  // },
  // {
  //   label: "下拉",
  //   prop: "select",
  //   type: "select",
  //   dicData: [
  //     {
  //       label: "禁用",
  //       value: 2
  //     },
  //     {
  //       label: "启用",
  //       value: 1
  //     }
  //   ]
  // },
  // {
  //   label: "切换",
  //   prop: "switch",
  //   type: "switch",
  //   slot: true,
  //   dicData: [
  //     {
  //       label: "禁用",
  //       value: 2
  //     },
  //     {
  //       label: "启用",
  //       value: 1
  //     }
  //   ],
  // }
])

const search = () => {
  console.log(111)
}

const modify = () => {
  column.value.splice(2, 1)
}
</script>

<template>
  <div style="width: 100%;">
    <!-- {{queryParam}} -->
    <m-search v-model="queryParam" size="" :column="column" @search="search">
      <template v-slot:switch="{row}">
        <el-input v-model="row.name"></el-input>
      </template>
    </m-search>
    <!-- <button @click="modify">修改</button> -->
  </div>
</template>

<style scoped>

</style>
