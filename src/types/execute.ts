export enum ExecutorType {
  CUSTOM = 'custom',
}

export enum ExecuteMode {
  STANDALONE = 'standalone',
  BROADCAST = 'broadcast',
  MAP_REDUCE = 'map_reduce',
}

export enum ExecutionStatus {
  CREATED = 'created',
  RUNNING = 'running',
  SUCCEED = 'succeed',
  FAILED = 'failed',
  RESTARTED = 'restarted',
  CANCELLED = 'cancelled',
  PAUSED = 'paused',
  KILLING = 'killing',
}

export class ExecutionStatusUtils {
  static desc(status: ExecutionStatus): string {
    switch (status) {
      case ExecutionStatus.CREATED:
        return "待执行"
      case ExecutionStatus.RUNNING:
        return "执行中"
      case ExecutionStatus.SUCCEED:
        return "执行成功"
      case ExecutionStatus.FAILED:
        return "执行失败"
      case ExecutionStatus.CANCELLED:
      case ExecutionStatus.KILLING:
      case ExecutionStatus.PAUSED:
      case ExecutionStatus.RESTARTED:
      default:
        return ""
    }
  }
}

export enum ExecutableType {
  WORKFLOW = 'workflow',
  EXECUTOR = 'executor',
}

export class ExecutableTypeUtils {
  static desc(v: ExecutableType): string {
    switch (v) {
      case ExecutableType.EXECUTOR:
        return "执行器"
      case ExecutableType.WORKFLOW:
        return "工作流"
      default:
        return ""
    }
  }
}

export interface OvertimeOption {

}

export interface RetryOption {

}

export interface DispatchOption {

}

export interface ExecutorConfig {
  type: ExecutorType
  appId: string
  executeMode: ExecuteMode
  dispatchOption?: DispatchOption
}

export interface CustomExecutorConfig extends ExecutorConfig {
  name: string
}

export interface ExecuteConfig {
  type?: ExecutableType
  overtimeOption?: OvertimeOption
  retryOption?: RetryOption
}

export interface WorkflowExecuteConfig extends ExecuteConfig {
  workflowId: string
}

export interface ExecutorExecuteConfig extends ExecuteConfig {
  executor: ExecutorConfig
}


