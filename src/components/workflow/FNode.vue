<!--
  - Copyright 2024-2030 Limbo Team (https://github.com/limbo-io).
  -
  - Licensed under the Apache License, Version 2.0 (the "License");
  - you may not use this file except in compliance with the License.
  - You may obtain a copy of the License at
  -
  - 	http://www.apache.org/licenses/LICENSE-2.0
  -
  - Unless required by applicable law or agreed to in writing, software
  - distributed under the License is distributed on an "AS IS" BASIS,
  - WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  - See the License for the specific language governing permissions and
  - limitations under the License.
  -->
<template>
  <template v-if="props.data.type === NodeType.START">
    <StartNode v-model="props.data as IStartNode"/>
  </template>
  <template v-if="props.data.type === NodeType.END">
    <EndNode v-model="props.data as IEndNode"/>
  </template>
  <template v-else-if="props.data.type === NodeType.EXECUTOR">
    <ExecutorNode v-model="props.data as IExecutorNode"/>
  </template>
</template>

<script lang="ts" setup>
import {FlowNodeProps, IEndNode, IExecutorNode, IStartNode, NodeType} from '@/types/node'
import ExecutorNode from "@/components/workflow/node/ExecutorNode.vue";

const props = defineProps<FlowNodeProps>()
</script>
