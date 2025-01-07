<template>
  <el-form-item label="执行器名称" label-width="100px">
    <el-input v-model="model.name" :disabled="disabled"/>
  </el-form-item>
</template>

<script lang="ts" setup>
import {CustomExecutor} from "@/types/executor";

const model = defineModel<CustomExecutor>({required: true})
const disabled = ref<boolean>(false)
</script>
