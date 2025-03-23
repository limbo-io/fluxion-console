<template>
  <el-form-item label="执行器名称" label-width="100px" :required="true">
    <el-input v-model="model.name"></el-input>
  </el-form-item>
</template>

<script lang="ts" setup>
import {CustomExecutorConfig} from "@/types/execute";

const model = defineModel<CustomExecutorConfig>({required: true})
</script>
