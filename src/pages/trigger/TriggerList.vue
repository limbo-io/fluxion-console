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
    <el-header>
      <el-button @click="() => {createDialogOpen = true;}">新建</el-button>
    </el-header>
    <el-main>
      <el-table :data="triggers" style="width: 100%">
        <el-table-column prop="id" label="ID" width="180"/>
        <el-table-column prop="description" label="描述" width="180"/>
        <el-table-column label="触发方式" width="180">
          <template #default="scope">

            <template v-if="scope.row.type === TriggerType.SCHEDULE">
              {{ '调度触发' }}
            </template>
            <template v-else-if="scope.row.type === TriggerType.WEBHOOK">
              {{ 'webhook' }}
            </template>
          </template>
        </el-table-column>
        <el-table-column label="执行方式" width="180">
          <template #default="scope">
            <template v-if="scope.row.config?.type === TriggerType.SCHEDULE">
              {{ '调度触发' }}
            </template>
            <template v-else-if="scope.row.config?.type === TriggerType.WEBHOOK">
              {{ 'webhook' }}
            </template>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
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

  <el-dialog v-model="createDialogOpen" title="新建" max-width="340">
    <el-form>
      <TriggerEditCommonItem v-model="trigger"/>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="createTrigger">确定</el-button>
      </div>
    </template>

  </el-dialog>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";
import {useI18n} from 'vue-i18n'
import {TriggerType} from "@/types/trigger";
import triggerApi, {TriggerCreateRequest, TriggerView} from "@/api/triggerApi";
import TriggerEditCommonItem from "@/pages/trigger/components/TriggerEditCommonItem.vue";

const {t} = useI18n()

const router = useRouter()
const createDialogOpen = ref<boolean>(false)
const trigger = ref<TriggerCreateRequest>({refId: '', refType: ''})
const triggers = ref<TriggerView[]>([])

const createTrigger = () => {
  triggerApi.create(trigger.value).then(res => {
    router.push(`/trigger/edit/${res.data}`)
  })
}

const deleteTrigger = (id: string) => {
  triggerApi.delete(id)
}

const page = () => {
  triggerApi.page({}).then(res => {
    triggers.value = res.data ?? []
  })
}
page()
</script>
