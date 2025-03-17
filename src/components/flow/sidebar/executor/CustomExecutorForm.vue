<template>
  <el-form-item label="执行器名称" label-width="100px">
    <el-input v-model="model.name" @change="cd" :disabled="disabled"/>
  </el-form-item>
</template>

<script lang="ts" setup>
import {CustomExecutorConfig} from "@/types/execute";

const model = defineModel<CustomExecutorConfig>({required: true})
const disabled = ref<boolean>(false)

const cd = () => {
  console.log(model.value)
}
</script>
