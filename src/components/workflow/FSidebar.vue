<template>
  <el-drawer v-model="isOpen" size="640">
    <template #header>
      <div class="h-center">
        <template v-if="node?.type === NodeType.EXECUTOR">
          <el-icon size="20" color="#409eff" class="el-icon--left">
            <Cpu/>
          </el-icon>
        </template>
        <el-text size="large">{{node?.name}}</el-text>
      </div>
    </template>
    <template v-if="node?.type === NodeType.EXECUTOR">
      <ExecutorSidebar v-model="node as IExecutorNode" />
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import {IExecutorNode, IWorkflowNode, NodeType} from '@/types/node'
import {Cpu} from "lucide-vue-next"

const isOpen = ref(false)
  const node = ref<IWorkflowNode>()

  const opened = (val: boolean, flowNode: IWorkflowNode) => {
    isOpen.value = val
    node.value = flowNode
  }

  defineExpose({
    opened,
  })
</script>

<style lang="scss" scoped>
</style>
