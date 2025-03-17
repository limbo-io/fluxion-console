export enum ExecutorType {
  CUSTOM_EXECUTOR = 'custom',
}

export interface OvertimeOption {

}

export interface RetryOption {

}

export interface DispatchOption {

}

export interface ExecutorConfig {
  type: ExecutorType
  appId: string,
  dispatchOption?: DispatchOption
}

export interface CustomExecutorConfig extends ExecutorConfig {
  name: string
}

export enum ExecuteType {
  FLOW = 'flow',
  EXECUTOR = 'executor',
}

export interface ExecuteConfig {
  type: ExecuteType
}

export interface FlowExecuteConfig extends ExecuteConfig {
  flowId: string
}

export interface ExecutorExecuteConfig extends ExecuteConfig {
  executor: ExecutorConfig
  overtimeOption?: OvertimeOption
  retryOption?: RetryOption
}


