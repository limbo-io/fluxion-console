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
  <el-container>
    <el-header>
      <el-button @click="() => {triggerEditDialogOpen = true;}">新建</el-button>
    </el-header>
    <el-main>
      <el-table :data="triggers" style="width: 100%">
        <el-table-column prop="id" label="ID" width="180"/>
        <el-table-column prop="name" label="名称" width="180"/>
        <el-table-column prop="description" label="描述" width="180"/>
        <el-table-column label="触发方式" width="180">
          <template #default="scope">
            <template v-if="scope.row.config.type === TriggerType.SCHEDULE">
              <p>{{ '调度触发' }}</p>
              <p>{{ scheduleDesc(scope.row.config) }}</p>
            </template>
            <template v-else-if="scope.row.config.type === TriggerType.WEBHOOK">
              <p>{{ 'webhook' }}</p>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="基本信息" width="180">
          <template #default="scope">
            <template v-if="scope.row.config.executeConfig.type === ExecutableType.WORKFLOW">
              <p>{{ '流程' }}</p>
              <p>{{ scope.row.config.executeConfig.workflowId }}</p>
            </template>
            <template v-else-if="scope.row.config.executeConfig.type === ExecutableType.EXECUTOR">
              <p>{{ '执行器' }}</p>
              <p>{{ scope.row.config.executeConfig.executor.name }}</p>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="是否启用" align="center" width="100">
          <template #default="scope">
            <el-switch v-model="scope.row.enabled" @change="(v: boolean) => changeEnabled(scope.row.id, v)"
                       active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="() => {trigger=scope.row;triggerEditDialogOpen = true;}">
              {{ t('options.edit') }}
            </el-button>
            <el-button link type="primary" size="small" @click="() => {
              router.push(`/trigger/edit/${scope.row.id}`)
            }">
              {{ t('options.setting') }}
            </el-button>
            <el-button link type="primary" size="small" @click="deleteTrigger(scope.row.id)">
              {{ t('options.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>

  <TriggerEditDialog v-model:opened="triggerEditDialogOpen" v-model:trigger="trigger"/>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";
import {useI18n} from 'vue-i18n'
import {ScheduleTriggerConfig, ScheduleType, Trigger, TriggerType} from "@/types/trigger";
import triggerApi from "@/api/triggerApi";
import {ExecutableType} from "@/types/execute";
import TriggerEditDialog from "@/pages/trigger/components/TriggerEditDialog.vue";

const {t} = useI18n()
const router = useRouter()

const triggers = ref<Trigger[]>([])
const triggerEditDialogOpen = ref<boolean>(false)
const trigger = ref<Trigger>({name: ''})

const deleteTrigger = (id: string) => {
  triggerApi.delete(id)
}

const scheduleDesc = (config: ScheduleTriggerConfig): string => {
  const scheduleOption = config.scheduleOption
  if (scheduleOption.type == ScheduleType.CRON) {
      return "corn: " + scheduleOption.cron
  } else if (ScheduleType.FIXED_DELAY == scheduleOption.type || ScheduleType.FIXED_RATE == scheduleOption.type) {
    return scheduleOption.type + ": " + scheduleOption.delay + "/" + scheduleOption.interval
  } else  {
    return "unknown"
  }
}

const changeEnabled = (triggerId: string, enabled: boolean) => {
  if (enabled) {
    triggerApi.enable(triggerId)
  } else {
    triggerApi.disable(triggerId)
  }
}

const page = () => {
  triggerApi.page({}).then(res => {
    triggers.value = res.data ?? []
  })
}
page()
</script>
