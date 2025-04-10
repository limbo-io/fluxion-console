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
  <el-dialog v-model="opened" :title="(trigger.id ? t('options.edit') : t('options.create')) + '触发器'" max-width="340">
    <el-form>
      <el-form-item label="名称" label-width="100px" :required="true">
        <el-input v-model="trigger.name"/>
      </el-form-item>
      <el-form-item label="描述" label-width="100px">
        <el-input v-model="trigger.description"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <template v-if="trigger.id">
          <el-button type="primary" @click="update">{{ t('options.edit')}}</el-button>
        </template>
        <template v-else>
          <el-button type="primary" @click="create">{{ t('options.create')}}</el-button>
        </template>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>

import {Trigger} from "@/types/trigger";
import triggerApi from "@/api/triggerApi";
import {useI18n} from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()

const opened = defineModel('opened')
const trigger = defineModel<Trigger>('trigger', {required: true})

const create = () => {
  triggerApi.create({
    name: trigger.value.name ?? "",
    description: trigger.value.description
  }).then(res => {
    router.push(`/trigger/edit/${res.data}`)
  })
}

const update = () => {
  triggerApi.update({
    id: trigger.value.id ?? "",
    name: trigger.value.name ?? "",
    description: trigger.value.description
  }).then(res => {
    opened.value = false
  })
}
</script>
