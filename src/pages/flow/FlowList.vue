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
      <el-button @click="() => {flowCreateDialogOpen = true;}">新建</el-button>
    </el-header>
    <el-main>
      <el-table :data="flows" style="width: 100%">
        <el-table-column prop="id" label="ID" width="300" />
        <el-table-column prop="name" label="名称" width="150" />
        <el-table-column prop="description" label="描述" width="200" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="() => {
              router.push(`/flow/edit/${scope.row.id}`)
            }">
              {{ t('options.setting') }}
            </el-button>
            <el-button link type="primary" size="small" @click="deleteFlow(scope.row.id)">
              {{ t('options.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>

  <el-dialog v-model="flowCreateDialogOpen" title="新建流程" max-width="340">
    <el-form>
      <FlowEditCommonItem v-model:name="flow.name" v-model:description="flow.description" />
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="newFlow">确定</el-button>
      </div>
    </template>

  </el-dialog>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";
import flowApi, {FlowCreateRequest} from "@/api/flowApi";
import FlowEditCommonItem from "@/pages/flow/components/FlowEditCommonItem.vue";
import {IFlow} from "@/types/flow";
import {useI18n} from 'vue-i18n'

const { t } = useI18n()

const router = useRouter()
const flowCreateDialogOpen = ref<boolean>(false)
const flow = ref<FlowCreateRequest>({name: ''})
const flows = ref<IFlow[]>([])

const newFlow = () => {
  flowApi.create(flow.value).then(res => {
    router.push(`/flow/edit/${res.data}`)
  })
}

const deleteFlow = (id: string) => {
  flowApi.delete(id)
}

const page = () => {
  flowApi.page({}).then(res => {
    flows.value = res.data ?? []
  })
}
page()
</script>
