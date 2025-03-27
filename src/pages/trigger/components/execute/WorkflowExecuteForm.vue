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

const model = defineModel<WorkflowExecuteConfig>({required: true})

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
</script>
