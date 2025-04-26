<template>
  <el-form-item label="流程" label-width="100px" :required="true">
    <el-select
      v-model="model.workflowId"
      placeholder="请选择"
      filterable
      remote
      reserve-keyword
      :remote-method="loadFlowOptions"
    >
      <el-option v-for="item in workflowOptions"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value"
      />
    </el-select>
  </el-form-item>
</template>

<script lang="ts" setup>
import {WorkflowExecuteConfig} from "@/types/execute";
import {ref} from "vue";
import {Option} from "@/types/common";
import workflowApi from "@/api/workflowApi";
import {IWorkflow} from "@/types/workflow";

const model = defineModel<WorkflowExecuteConfig>({required: true})
let selectWorkflow: IWorkflow | undefined;

const workflowOptions = ref<Option[]>([])
const loadFlowOptions = (keyword?: string) => {
  workflowApi.page({name: keyword}).then(res => {
    workflowOptions.value = res.data?.map(workflow => {
      return {
        label: workflow.name,
        value: workflow.id
      }
    }) ?? []
  })
}

// 如果已经选中流程，需要加载进来
if (model.value.workflowId) {
  workflowApi.get(model.value.workflowId).then(res => {
    selectWorkflow = res.data
    if (selectWorkflow) {
      workflowOptions.value = [{
        label: selectWorkflow.name,
        value: selectWorkflow.id!!
      }]
    }
  })
}
</script>
