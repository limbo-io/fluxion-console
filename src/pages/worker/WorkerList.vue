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
      <el-table :data="workers" style="width: 100%">
        <el-table-column prop="appId" label="ID" />
        <el-table-column prop="host" label="Host" />
        <el-table-column prop="port" label="Port" />
        <el-table-column label="标签">
          <template #default="scope">
            <el-tag v-for="(property) in scope.row.tags" :key="property" type="success">
              {{property.name + (property.value ? ":" + property.value : "")}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template #default="scope">
            <template v-if="scope.row.status == WorkerStatus.ONLINE">
              <el-text type="success">{{ scope.row.status }}</el-text>
            </template>
            <template v-else-if="scope.row.status == WorkerStatus.OFFLINE">
              <el-text type="danger">{{ scope.row.status }}</el-text>
            </template>
            <template v-else>
              <el-text type="info">{{ scope.row.status }}</el-text>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import workerApi, {WorkerView} from "@/api/workerApi";
import {WorkerStatus} from "@/types/worker";
import {Tag} from "@/types/common";

const route = useRoute()

const workers = ref<WorkerView[]>([])

const tagDesc = (tag: Tag): string => {
  return tag.name + tag.value ? "" : ""
}

const page = () => {
  workerApi.page({
    appId: route.query.appId as (string | undefined)
  }).then(res => {
    workers.value = res.data ?? []
  })
}
page()
</script>
