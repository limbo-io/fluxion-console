import {ExecuteConfig} from "@/types/execute";

export enum TriggerType {
  WEBHOOK = 'webhook',
  SCHEDULE = 'schedule',
}

export enum ScheduleType {
  FIXED_RATE = 'fixed_rate',
  FIXED_DELAY = 'fixed_delay',
  CRON = 'cron',
}

export interface TriggerConfig {
  type?: TriggerType
  executeConfig: ExecuteConfig
}

export interface ScheduleOption {
  /**
   * 调度方式
   * @format int32
   */
  type: ScheduleType;
  /**
   * 调度开始时间
   * @format date-time
   */
  startTime?: string;
  /**
   * 调度结束时间
   * @format date-time
   */
  endTime?: string;
  /**
   * 延迟时间
   * 延迟时间 -- 当前时间多久后调度
   * @format float
   */
  delay?: number;
  /**
   * 调度间隔时间
   * 当调度方式为FIXED_DELAY时，表示前一次作业调度执行完成后，隔多久触发第二次调度。当调度方式为FIXED_RATE时，表示前一次作业调度下发后，隔多久触发第二次调度。
   * @format float
   */
  interval?: number;
  /**
   * 作业调度的CRON表达式
   * 当调度方式为CRON时，根据此CRON表达式计算得到的时间点触发作业调度。
   */
  cron?: string;
  /**
   * 作业调度的CRON表达式类型
   * 当调度方式为CRON时，根据此CRON表达式计算得到的时间点触发作业调度。
   */
  cronType?: string;
}

export interface ScheduleTriggerConfig extends TriggerConfig {
  scheduleOption: ScheduleOption
}

export interface WebhookTriggerConfig extends TriggerConfig {

}

export interface Trigger {
  id?: string
  name?: string
  description?: string
  config?: TriggerConfig
  enabled?: boolean
}
