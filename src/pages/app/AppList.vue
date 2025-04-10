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
      <el-table :data="apps" style="width: 100%">
        <el-table-column prop="appId" label="ID"/>
        <el-table-column prop="appName" label="名称"/>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="() => {
              router.push(`/worker/list?appId=${scope.row.appId}`)
            }">
              {{ t('options.nodes') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import {useI18n} from 'vue-i18n'
import appApi, {AppView} from "@/api/appApi";

const {t} = useI18n()
const router = useRouter()

const apps = ref<AppView[]>([])

const page = () => {
  appApi.page({}).then(res => {
    apps.value = res.data ?? []
  })
}
page()
</script>
