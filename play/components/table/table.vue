<script setup lang="ts">
/**
 * @name: table
 * @author: itmobai
 * @date: 2023-07-13 17:38
 * @description：table
 * @update: 2023-07-13 17:38
 */
import {ref} from "vue";
import { TableColumn } from "whitemo-crud-element/lib";

const column = ref<TableColumn[]>([
  // {
  //   prop: "",
  //   type: "selection"
  // },
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
    default: "无状态",
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
        value: 2,
        color: "red"
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
  },
  {
    label: "图片",
    prop: "img",
    type: "image",
    align: "center",
    imgSuffix: ",",
    imgPrefix: "https"
  },
  {
    label: "视频",
    prop: "video",
    type: "video",
    align: "center",
  }
])

const list = ref<any>([
  {
    name: "测试人员",
    keyword: "Cr",
    select: 2,
    switch: 2,
    img: "://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg,://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
    video: "/assets/1.mp4;/assets/1.mp4"
  }
])

const page = ref(1)
const limit = ref(10)
const select = ref<any>([])


</script>

<template>
  <m-table :data="list" :total="55" v-model:page="page" v-model:limit="limit" :column="column" v-model:select="select">
    <template v-slot:switch="{row, $index}">
      <el-switch :active-value="1" :inactive-value="2" :modelValue="row.switch"></el-switch>
    </template>
  </m-table>
  {{ select }}
</template>

<style scoped>

</style>
