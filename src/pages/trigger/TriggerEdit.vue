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
  <el-container>
    <el-main>
      <el-form>
        <el-form-item label="执行类型" label-width="100px" :required="true">
          <el-select v-model="trigger.executeConfig.type" placeholder="请选择">
            <el-option v-for="item in executeTypes"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"
            />
          </el-select>
        </el-form-item>
        <template v-if="trigger.executeConfig.type === ExecuteType.FLOW">
          <el-form-item label="流程" label-width="100px" :required="true">
            <el-select
              v-model="trigger.executeConfig.flowId"
              placeholder="请选择"
              filterable
              remote
              reserve-keyword
              :remote-method="loadFlowRefs"
            >
              <el-option v-for="item in flowRefs"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"
              />
            </el-select>
          </el-form-item>
        </template>
        <template v-else-if="trigger.executeConfig.type === ExecuteType.EXECUTOR">
          <el-form-item label="执行器" label-width="100px" :required="true">
            <el-input v-model="trigger.executeConfig.name"/>
          </el-form-item>
        </template>
        <!-- 触发方式 -->
        <el-form-item label="触发方式" label-width="100px" :required="true">
          <el-select v-model="trigger.type" placeholder="请选择"
                     @change="changeTriggerConfig"
                     :disabled="trigger.id"
          >
            <el-option v-for="item in triggerTypes"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"
            />
          </el-select>
        </el-form-item>
        <template v-if="trigger.type === TriggerType.SCHEDULE">
          <ScheduleTriggerForm v-model="trigger.triggerConfig as ScheduleTriggerConfig"/>
        </template>
        <!--        <template v-else-if="trigger?.type === TriggerType.WEBHOOK">-->
        <!--          <WebhookTriggerForm v-model="trigger as WebhookTrigger"/>-->
        <!--        </template>-->
      </el-form>
    </el-main>
    <el-footer>
      <el-button type="primary" @click="save">{{ t('options.save') }}</el-button>
    </el-footer>
  </el-container>
</template>

<script lang="ts" setup>
import {useI18n} from 'vue-i18n'
import triggerApi from "@/api/triggerApi"
import flowApi from "@/api/flowApi"
import {ScheduleTriggerConfig, ScheduleType, TriggerConfig, TriggerType} from "@/types/trigger"
import ScheduleTriggerForm from './components/ScheduleTriggerForm.vue'
import {ref} from "vue";
import {useRouter} from "vue-router";
import {Option} from "@/types/common";
import {ExecuteConfig, ExecuteType} from "@/types/execute";

const {t} = useI18n()
const route = useRoute()
const router = useRouter()

interface ITriggerEditForm {
  id?: string,
  name?: string
  type?: TriggerType
  executeType?: ExecuteType
  triggerConfig: TriggerConfig
  executeConfig: ExecuteConfig
  description?: string
}

const triggerTypes = [
  {
    label: '调度',
    value: TriggerType.SCHEDULE,
  }
]

const executeTypes = [
  {
    label: '执行器',
    value: ExecuteType.EXECUTOR,
  },
  {
    label: '流程',
    value: ExecuteType.FLOW,
  },
]

const trigger = ref<ITriggerEditForm>({triggerConfig: {}, executeConfig: {}})

const changeTriggerConfig = (triggerType: TriggerType) => {
  const tg = trigger.value
  tg.triggerConfig.type = triggerType

  switch (tg.type) {
    case TriggerType.SCHEDULE: {
      const config = tg.triggerConfig as ScheduleTriggerConfig
      if (!config.scheduleOption) {
        config.scheduleOption = {
          type: ScheduleType.CRON
        }
      }
      break
    }
  }
}

const flowRefs = ref<Option[]>([])
const loadFlowRefs = (keyword?: string) => {
  flowApi.page({name: keyword}).then(res => {
    flowRefs.value = res.data?.map(flow => {
      return {
        label: flow.name,
        value: flow.id
      }
    }) ?? []
  })
}

const save = () => {
  if (trigger.value.id) {
    triggerApi.update(trigger.value).then(res => {
      router.push(`/trigger/edit/${res.data}`)
    })
  } else {
    triggerApi.create(trigger.value).then(res => {
      router.push(`/trigger/edit/${res.data}`)
    })
  }
}

if (route.params.id) {
  triggerApi.get(route.params.id).then(res => {
    const tg = res.data
    if (!tg) {
      return
    }
    trigger.value = tg
    console.log(tg)
  })
}

</script>
