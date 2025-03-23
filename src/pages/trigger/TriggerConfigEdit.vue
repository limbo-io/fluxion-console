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
        <!-- 执行配置 -->
        <ExecuteConfigForm v-model="config.executeConfig"/>
        <!-- 触发配置 -->
        <el-form-item label="触发方式" label-width="100px" :required="true">
          <el-select v-model="config.type" placeholder="请选择"
                     @change="changeTriggerType"
                     :disabled="config.type"
          >
            <el-option v-for="item in triggerTypes"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"
            />
          </el-select>
        </el-form-item>
        <template v-if="config.type === TriggerType.SCHEDULE">
          <ScheduleTriggerForm v-model="config as ScheduleTriggerConfig"/>
        </template>
        <!--        <template v-else-if="trigger?.type === TriggerType.WEBHOOK">-->
        <!--          <WebhookTriggerForm v-model="trigger as WebhookTrigger"/>-->
        <!--        </template>-->
      </el-form>
    </el-main>
    <el-footer>
      <el-button type="primary" @click="publish">{{ t('options.save') }}</el-button>
    </el-footer>
  </el-container>
</template>

<script lang="ts" setup>
import {useI18n} from 'vue-i18n'
import triggerApi from "@/api/triggerApi"
import {ScheduleTriggerConfig, ScheduleType, TriggerConfig, TriggerType} from "@/types/trigger"
import {ref} from "vue";
import {useRouter} from "vue-router";
import ExecuteConfigForm from "@/pages/trigger/components/execute/ExecuteConfigForm.vue";
import ScheduleTriggerForm from "@/pages/trigger/components/trigger/ScheduleTriggerForm.vue";

const {t} = useI18n()
const route = useRoute()
const router = useRouter()

const triggerId = ref<string>()
const config = ref<TriggerConfig>({
  executeConfig: {}
})

const triggerTypes = [
  {
    label: '调度',
    value: TriggerType.SCHEDULE,
  }
]

const changeTriggerType = (triggerType: TriggerType) => {
  switch (triggerType) {
    case TriggerType.SCHEDULE: {
      const scheduleConfig = config.value as ScheduleTriggerConfig
      if (!scheduleConfig.scheduleOption) {
        scheduleConfig.scheduleOption = {
          type: ScheduleType.CRON
        }
      }
      break
    }
  }
}

const publish = () => {
  triggerApi.publish({
    id: triggerId.value,
    config: config.value
  }).then(res => {
    router.push(`/trigger/list`)
  })
}

if (route.params.id) {
  const id = route.params.id
  triggerId.value = id
  triggerApi.get(id).then(res => {
    const tg = res.data
    if (!tg || !tg.config) {
      return
    }
    config.value = tg.config
  })
}

</script>
