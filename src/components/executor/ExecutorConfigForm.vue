<template>
  <el-form-item label="执行应用" label-width="100px" :required="true">
    <el-select
      v-model="model.appId"
      placeholder="请选择"
      filterable
      remote
      reserve-keyword
      :remote-method="loadAppOptions"
    >
      <el-option v-for="item in appOptions"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value"
      />
    </el-select>
  </el-form-item>
  <el-form-item label="执行器类型" label-width="100px" :required="true">
    <el-select v-model="model.type" placeholder="请选择">
      <el-option v-for="item in executorTypeOptions"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value"
      />
    </el-select>
  </el-form-item>
  <template v-if="model.type === ExecutorType.CUSTOM">
      <CustomExecutorConfigForm v-model="model as CustomExecutorConfig" />
  </template>
  <el-form-item label="执行模式" :required="true">
    <el-select v-model="model.executeMode" placeholder="请选择">
      <el-option v-for="item in executeModeOptions"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value"
      />
    </el-select>
  </el-form-item>
</template>

<script lang="ts" setup>
import {CustomExecutorConfig, ExecuteMode, ExecutorConfig, ExecutorType} from "@/types/execute";
import {Option} from "@/types/common";
import appApi, {AppView} from "@/api/appApi";

const model = defineModel<ExecutorConfig>({required: true})

const executorTypeOptions = [{
  label: '自定义执行器',
  value: ExecutorType.CUSTOM
}]

const executeModeOptions = [
  {
    label: '单机模式',
    value: ExecuteMode.STANDALONE
  },
  {
    label: '广播模式',
    value: ExecuteMode.BROADCAST
  },
  {
    label: 'MapReduce',
    value: ExecuteMode.MAP_REDUCE
  },
]

const appOptions = ref<Option[]>([])
let selectApp: AppView | undefined;

const loadAppOptions = (keyword?: string) => {
  appApi.page({name: keyword}).then(res => {
    appOptions.value = res.data?.map(app => {
      return {
        label: app.appName,
        value: app.appId
      }
    }) ?? []
  })
}

// 如果已经选中应用，需要加载进来
if (model.value.appId) {
  appApi.get(model.value.appId).then(res => {
    selectApp = res.data
    if (selectApp) {
      appOptions.value = [{
        label: selectApp.appName,
        value: selectApp.appId
      }]
    }
  })
}
</script>
