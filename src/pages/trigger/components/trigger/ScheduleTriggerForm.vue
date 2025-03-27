<!--
  - Copyright 2025-2030 limbo-io Team (https://github.com/limbo-io).
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
  <el-form-item label="调度开始时间" :required="true">
    <el-date-picker v-model="model.scheduleOption.startTime" type="datetime"
                    placeholder="请选择" :clearable="false" :disabled-date="disabledStartTime"
    />
  </el-form-item>
  <el-form-item label="调度结束时间">
    <el-date-picker v-model="model.scheduleOption.endTime" type="datetime"
                    placeholder="永不结束" :disabled-date="disabledEndTime"
    />
  </el-form-item>
  <el-form-item label="延迟时间(毫秒)">
    <el-input-number v-model="model.scheduleOption.delay" :min="0" controls-position="right" />
  </el-form-item>

  <el-form-item label="调度方式" :required="true">
    <el-radio-group v-model="model.scheduleOption.type" class="ml-4">
      <el-radio v-for="item in scheduleTypeOptions" :key="item.value" :value="item.value">
        {{ item.label }}
      </el-radio>
    </el-radio-group>
  </el-form-item>

  <template v-if="ScheduleType.FIXED_RATE === model.scheduleOption.type
    || ScheduleType.FIXED_DELAY === model.scheduleOption.type">
    <el-form-item label="调度间隔(毫秒)" :required="true">
      <el-input-number v-model="model.scheduleOption.interval" :min="0" :controls="false" />
    </el-form-item>
  </template>

  <template v-if="ScheduleType.CRON === model.scheduleOption.type">
    <el-form-item label="CRON表达式" :required="true">
      <el-input v-model="model.scheduleOption.cron" />
    </el-form-item>
  </template>

</template>

<script lang="ts" setup>
import {ScheduleTriggerConfig, ScheduleType} from '@/types/trigger'
import {TIME_FOREVER} from "@/types/common";
import dayjs from 'dayjs'

const model = defineModel<ScheduleTriggerConfig>({required: true})
if (TIME_FOREVER === model.value.scheduleOption.endTime) {
  model.value.scheduleOption.endTime = null
}

const scheduleTypeOptions = [{
  label: 'CRON表达式',
  value: ScheduleType.CRON
}, {
  label: '固定速度',
  value: ScheduleType.FIXED_RATE
}, {
  label: '固定延迟',
  value: ScheduleType.FIXED_DELAY
}]

const disabledStartTime = (date: Date) => {
  const today = dayjs(dayjs().format('YYYY-MM-DD')).toDate()
  return date < today
}

const disabledEndTime = (date: Date) => {
  const startTime = dayjs(dayjs(model.value.scheduleOption.startTime).format('YYYY-MM-DD')).toDate()
  return date < startTime
}
</script>
