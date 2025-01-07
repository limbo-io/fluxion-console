export enum TriggerType {
  WEBHOOK = 'webhook',
  SCHEDULE = 'schedule',
}

export enum TriggerRefType {
  FLOW = "flow",
  EXECUTOR = "executor",
}

export enum ScheduleType {
  FIXED_RATE = 'fixed_rate',
  FIXED_DELAY = 'fixed_delay',
  CRON = 'cron',
}

export interface Trigger {
  type: TriggerType
}

export interface TriggerConfig {
  trigger: Trigger
}

export interface ScheduleOption {
  /**
   * 调度方式
   * @format int32
   */
  scheduleType: string;
  /**
   * 调度开始时间
   * @format date-time
   */
  scheduleStartAt?: string;
  /**
   * 调度结束时间
   * @format date-time
   */
  scheduleEndAt?: string;
  /**
   * 延迟时间
   * 延迟时间 -- 当前时间多久后调度
   * @format float
   */
  scheduleDelay?: number;
  /**
   * 调度间隔时间
   * 当调度方式为FIXED_DELAY时，表示前一次作业调度执行完成后，隔多久触发第二次调度。当调度方式为FIXED_RATE时，表示前一次作业调度下发后，隔多久触发第二次调度。
   * @format float
   */
  scheduleInterval?: number;
  /**
   * 作业调度的CRON表达式
   * 当调度方式为CRON时，根据此CRON表达式计算得到的时间点触发作业调度。
   */
  scheduleCron?: string;
  /**
   * 作业调度的CRON表达式类型
   * 当调度方式为CRON时，根据此CRON表达式计算得到的时间点触发作业调度。
   */
  scheduleCronType?: string;
}

export interface ScheduleTrigger extends Trigger {
  scheduleOption: ScheduleOption
}

export interface WebhookTrigger extends Trigger {

}
