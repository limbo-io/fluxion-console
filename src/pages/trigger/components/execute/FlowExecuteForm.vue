<template>
  <el-form-item label="流程" label-width="100px" :required="true">
    <el-select
      v-model="model.flowId"
      placeholder="请选择"
      filterable
      remote
      reserve-keyword
      :remote-method="loadFlowOptions"
    >
      <el-option v-for="item in flowOptions"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value"
      />
    </el-select>
  </el-form-item>
</template>

<script lang="ts" setup>
import {FlowExecuteConfig} from "@/types/execute";
import {ref} from "vue";
import {Option} from "@/types/common";
import flowApi from "@/api/flowApi";

const model = defineModel<FlowExecuteConfig>({required: true})

const flowOptions = ref<Option[]>([])
const loadFlowOptions = (keyword?: string) => {
  flowApi.page({name: keyword}).then(res => {
    flowOptions.value = res.data?.map(flow => {
      return {
        label: flow.name,
        value: flow.id
      }
    }) ?? []
  })
}
</script>
