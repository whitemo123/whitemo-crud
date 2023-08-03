<script lang="ts" setup>
import { ref } from "vue"
import type { FormColumn } from "whitemo-crud-element/lib"
import {Form} from "whitemo-crud-element/lib"

const formRef = ref<InstanceType<typeof Form>>()

const column = ref<FormColumn[]>([
  {
    label: "索引",
    type: "index"
  },
  {
    label: "关键字",
    prop: "keyword",
    sort: 2,
    type: "text",
    rules: [
      {required: true, message: "测试", trigger: "blur"}
    ]
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


const submit = async () => {
  console.log(await formRef.value?.validForm())
}

</script>

<template>
  <div>
    <m-form ref="formRef" v-model="form" :column="column">
      <template v-slot:switch="{row}">
        <el-input v-model="row.switch"></el-input>
      </template>
    </m-form>
    <button @click="submit">测试</button>
    {{ form }}
  </div>
</template>

<style lang="scss" scoped></style>