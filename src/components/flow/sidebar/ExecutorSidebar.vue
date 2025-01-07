<template>
  <template v-if="model.executor.type === ExecutorType.CUSTOM_EXECUTOR">
    <CustomExecutorForm v-model="model.executor"></CustomExecutorForm>
  </template>
</template>

<script lang="ts" setup>
import {IExecutorNode} from '@/types/node'
import {ExecutorType} from "@/types/executor";

const model = defineModel<IExecutorNode>({required: true})
</script>

<style lang="scss" scoped>
</style>
