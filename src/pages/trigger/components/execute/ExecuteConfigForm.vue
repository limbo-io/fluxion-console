<!--
  - Copyright 2025-2030 limbo-io Team (https://github.com/limbo-io).
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
  <el-form-item label="目标类型" label-width="100px" :required="true">
    <el-select v-model="model.type" placeholder="请选择" @change="changeExecutableType">
      <el-option v-for="item in executableTypes"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value"
      />
    </el-select>
  </el-form-item>
  <template v-if="model.type === ExecutableType.FLOW">
    <FlowExecuteForm v-model="model as FlowExecuteConfig" />
  </template>
  <template v-else-if="model.type === ExecutableType.EXECUTOR">
    <ExecutorExecuteForm v-model="model as ExecutorExecuteConfig" />
  </template>
</template>

<script lang="ts" setup>
import {
  ExecutableType,
  ExecuteConfig,
  ExecuteMode,
  ExecutorExecuteConfig,
  ExecutorType,
  FlowExecuteConfig
} from "@/types/execute";
import FlowExecuteForm from "@/pages/trigger/components/execute/FlowExecuteForm.vue";
import ExecutorExecuteForm from "@/pages/trigger/components/execute/ExecutorExecuteForm.vue";

const model = defineModel<ExecuteConfig>({required: true})

const executableTypes = [
  {
    label: '执行器',
    value: ExecutableType.EXECUTOR,
  },
  {
    label: '流程',
    value: ExecutableType.FLOW,
  },
]

const changeExecutableType = (executableType: ExecutableType) => {
  switch (executableType) {
    case ExecutableType.EXECUTOR: {
      const config = model.value as ExecutorExecuteConfig
      if (!config.executor) {
        config.executor = {
          type: ExecutorType.CUSTOM,
          appId: "",
          executeMode: ExecuteMode.STANDALONE,
        }
      }
      break
    }
  }
}
</script>
