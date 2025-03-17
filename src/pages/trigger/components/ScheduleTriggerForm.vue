<template>
  <el-form-item label="调度开始时间">
    <el-date-picker v-model="model.scheduleOption.startTime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="请选择"/>
  </el-form-item>
  <el-form-item label="调度结束时间">
    <el-date-picker v-model="model.scheduleOption.endTime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="请选择"/>
  </el-form-item>
  <el-form-item label="延迟时间(毫秒)">
    <el-input-number v-model="model.scheduleOption.delay" :min="0" controls-position="right" />
  </el-form-item>

  <el-form-item label="调度方式">
    <el-radio-group v-model="model.scheduleOption.type" class="ml-4">
      <el-radio v-for="item in scheduleTypeOptions" :key="item.value" :value="item.value">
        {{ item.label }}
      </el-radio>
    </el-radio-group>
  </el-form-item>

  <template v-if="ScheduleType.FIXED_RATE === model.scheduleOption.type
    || ScheduleType.FIXED_DELAY === model.scheduleOption.type">
    <el-form-item label="调度间隔(毫秒)">
      <el-input-number v-model="model.scheduleOption.interval" :min="0" :controls="false" />
    </el-form-item>
  </template>

  <template v-if="ScheduleType.CRON === model.scheduleOption.type">
    <el-form-item label="CRON表达式">
      <el-input v-model="model.scheduleOption.cron" />
    </el-form-item>
  </template>

</template>

<script lang="ts" setup>
import {ScheduleTriggerConfig, ScheduleType} from '@/types/trigger'

const model = defineModel<ScheduleTriggerConfig>({required: true})

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
</script>
