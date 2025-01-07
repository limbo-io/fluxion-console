<!--
  - Copyright 2024-2030 Fluxion Team (https://github.com/Fluxion-io).
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
  <el-form-item label="触发方式" label-width="100px" :required="true">
    <el-select
      v-model="model.type"
      placeholder="请选择"
    >
      <el-option v-for="item in triggerTypes"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value"
      />
    </el-select>
  </el-form-item>
  <el-form-item label="触发类型" label-width="100px" :required="true">
    <el-select
      v-model="model.refType"
      placeholder="请选择"
      @change="loadTriggerRefs"
    >
      <el-option v-for="item in refTypes"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value"
      />
    </el-select>
  </el-form-item>
  <el-form-item label="触发目标" label-width="100px" :required="true">
    <el-select
      v-model="model.refId"
      placeholder="请选择"
      filterable
      remote
      reserve-keyword
      :remote-method="loadTriggerRefs"
    >
      <el-option v-for="item in triggerRefs"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value"
      />
    </el-select>
  </el-form-item>
  <el-form-item label="描述" label-width="100px">
    <el-input v-model="model.description"/>
  </el-form-item>
</template>

<script lang="ts" setup>
import {TriggerRefType, TriggerType} from "@/types/trigger";
import {ref} from "vue";
import {Option} from "@/types/common";
import flowApi from "@/api/flowApi";

interface ITriggerEditForm {
  type?: string
  refId?: string
  refType?: string
  description?: string
}

const triggerTypes = [
  {
    label: '调度',
    value: TriggerType.SCHEDULE,
  }
]

const refTypes = [
  {
    label: '流程',
    value: TriggerRefType.FLOW,
  }
]

const model = defineModel<ITriggerEditForm>({required: true})
const triggerRefs = ref<Option[]>([])

const loadTriggerRefs = (keyword?: string) => {
  switch (model.value.refType) {
    case TriggerRefType.FLOW:
      flowApi.page({name: keyword}).then(res => {
        triggerRefs.value = res.data?.map(flow => {
          return {
            label: flow.name,
            value: flow.id
          }
        }) ?? []
      })
      break
  }
}


</script>
