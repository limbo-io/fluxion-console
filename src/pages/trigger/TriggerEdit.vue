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
        <template v-if="trigger?.type === TriggerType.SCHEDULE">
          <ScheduleTriggerForm v-model="trigger!.config!.trigger as ScheduleTrigger"/>
        </template>
<!--        <template v-else-if="trigger?.type === TriggerType.WEBHOOK">-->
<!--          <WebhookTriggerForm v-model="trigger as WebhookTrigger"/>-->
<!--        </template>-->
      </el-form>
    </el-main>
    <el-footer>
      <el-button type="primary" @click="publish">{{t('options.save')}}</el-button>
    </el-footer>
  </el-container>
</template>

<script lang="ts" setup>
import {useI18n} from 'vue-i18n'
import triggerApi, {TriggerView} from "@/api/triggerApi"
import {ScheduleTrigger, ScheduleType, TriggerType} from "@/types/trigger"
import ScheduleTriggerForm from './components/ScheduleTriggerForm.vue'

const { t } = useI18n()

const route = useRoute()
const trigger = ref<TriggerView>()

const publish = () => {
  triggerApi.publish({
    id: trigger.value!.id,
    config: trigger.value!.config!
  })
}

const load = (id: string) => {
  triggerApi.get(id).then(res => {
    const f = res.data
    if (!f) {
      return
    }
    const v = res.data!
    if (!v.config) {
      switch (v.type) {
        case TriggerType.SCHEDULE: {
          const trigger: ScheduleTrigger = {
            type: TriggerType.SCHEDULE,
            scheduleOption: {
              scheduleType: ScheduleType.CRON
            }
          }
          v.config = {
            trigger: trigger
          }
          break
        }
      }
    }
    trigger.value = v
    console.log(v)
  })
}
load(route.params.id)

</script>
