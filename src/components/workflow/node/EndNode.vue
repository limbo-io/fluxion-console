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
  <el-card>
    <template #header>
      <div class="h-center">
        <el-icon color="#409eff" class="el-icon--left">
          <ArrowRightToLine />
        </el-icon>
        <span class="left-last">{{ model.name }}</span>
      </div>
    </template>
  </el-card>
  <Handle :id="`${model.id}-target`" :position="Position.Left" type="target"/>
</template>

<script lang="ts" setup>
import {IEndNode} from '@/types/node'
import {Handle, Position} from '@vue-flow/core'
import {ArrowRightToLine} from "lucide-vue-next"

const model = defineModel<IEndNode>({required: true})
</script>

<style lang="scss" scoped>

</style>
