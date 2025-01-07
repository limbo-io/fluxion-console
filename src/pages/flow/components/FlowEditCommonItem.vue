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
  <el-form-item label="名称" label-width="100px" :required="true">
    <el-input v-model="name"/>
  </el-form-item>
  <el-form-item label="描述" label-width="100px">
    <el-input v-model="description"/>
  </el-form-item>
</template>

<script lang="ts" setup>
const name = defineModel('name')
const description = defineModel('description')
</script>
