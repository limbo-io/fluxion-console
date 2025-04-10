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
    <el-main>
      <el-table :data="executions" style="width: 100%">
        <el-table-column prop="executionId" label="ID"/>
        <el-table-column label="计划时间">
          <template #default="scope">
            {{ DateUtils.formatTimestampYMDHMS(scope.row.triggerAt) }}
          </template>
        </el-table-column>
        <el-table-column label="开始时间">
          <template #default="scope">
            {{ DateUtils.formatTimestampYMDHMS(scope.row.startAt) }}
          </template>
        </el-table-column>
        <el-table-column label="结束时间">
          <template #default="scope">
            {{ DateUtils.formatTimestampYMDHMS(scope.row.endAt) }}
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template #default="scope">
            {{ ExecutionStatusUtils.desc(scope.row.status) }}
          </template>
        </el-table-column>
        <el-table-column label="触发器">
          <template #default="scope">
            {{ TriggerTypeUtils.desc(scope.row.triggerType) + ": " + scope.row.triggerId  }}
          </template>
        </el-table-column>
        <el-table-column label="对象">
          <template #default="scope">
            <p>{{ ExecutableTypeUtils.desc(scope.row.executableType) + ": " + scope.row.executableId  }}</p>
            <p>{{ "版本: " + scope.row.executableVersion  }}</p>
          </template>
        </el-table-column>
<!--        <el-table-column label="操作">-->
<!--          <template #default="scope">-->
<!--            <el-button link type="primary" size="small" @click="toDetail(scope.row)">-->
<!--              {{ t('options.detail') }}-->
<!--            </el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
      </el-table>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import {useI18n} from 'vue-i18n'
import DateUtils from '@/utils/DateUtils'
import executionApi, {ExecutionView} from "@/api/executionApi";
import {ExecutableType, ExecutableTypeUtils, ExecutionStatusUtils} from "@/types/execute";
import {TriggerTypeUtils} from "@/types/trigger";

const {t} = useI18n()
const router = useRouter()

const executions = ref<ExecutionView[]>([])

const toDetail = (view: ExecutionView) => {
  // 目前没有重试，如果是执行器则没效果
  // 如果是工作流 进工作流
  if (ExecutableType.WORKFLOW === view.executableType) {
    router.push(`/execution/workflow/${view.executableId}`)
  }
}

const page = () => {
  executionApi.page({}).then(res => {
    executions.value = res.data ?? []
  })
}
page()
</script>
