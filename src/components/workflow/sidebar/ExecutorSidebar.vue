<template>
  <ExecutorConfigForm v-model="model.executor" />
</template>

<script lang="ts" setup>
import {IExecutorNode} from '@/types/node'

const model = defineModel<IExecutorNode>({required: true})
</script>

<style lang="scss" scoped>
</style>
