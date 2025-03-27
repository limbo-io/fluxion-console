export enum ExecutorType {
  CUSTOM = 'custom',
}

export enum ExecuteMode {
  STANDALONE = 'standalone',
  BROADCAST = 'broadcast',
  MAP_REDUCE = 'map_reduce',
}

export enum ExecutableType {
  WORKFLOW = 'workflow',
  EXECUTOR = 'executor',
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


