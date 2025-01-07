<template>
  <el-form-item label="调度周期">
    <el-date-picker v-model="scheduleRange"
                    type="datetimerange" range-separator="To" value-format="YYYY-MM-DD HH:mm:ss"
                    placeholder="请选择" start-placeholder="请选择开始时间" end-placeholder="请选择结束时间" />
  </el-form-item>
  <el-form-item label="延迟时间(毫秒)">
    <el-input-number v-model="model.scheduleOption.scheduleDelay" :min="0" controls-position="right" />
  </el-form-item>

  <el-form-item label="调度方式">
    <el-radio-group v-model="model.scheduleOption.scheduleType" class="ml-4">
      <el-radio v-for="item in scheduleTypeOptions" :key="item.value" :value="item.value">
        {{ item.label }}
      </el-radio>
    </el-radio-group>
  </el-form-item>

  <template v-if="ScheduleType.FIXED_RATE === model.scheduleOption.scheduleType
    || ScheduleType.FIXED_DELAY === model.scheduleOption.scheduleType">
    <el-form-item label="调度间隔(毫秒)">
      <el-input-number v-model="model.scheduleOption.scheduleInterval" :min="0" :controls="false" />
    </el-form-item>
  </template>

  <template v-if="ScheduleType.CRON === model.scheduleOption.scheduleType">
    <el-form-item label="CRON表达式">
      <el-input v-model="model.scheduleOption.scheduleCron" />
    </el-form-item>
  </template>

</template>

<script lang="ts" setup>
import {ScheduleTrigger, ScheduleType} from '@/types/trigger'

const model = defineModel<ScheduleTrigger>({required: true})
const scheduleRange = ref<[string, string]>(['', ''])

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
