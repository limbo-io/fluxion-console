export enum ExecutorType {
  CUSTOM_EXECUTOR = 'custom_executor',
}

export interface OvertimeOption {

}

export interface RetryOption {

}

export interface DispatchOption {

}

export interface Executor {
  type: ExecutorType
  overtimeOption?: OvertimeOption
  retryOption?: RetryOption
  dispatchOption?: DispatchOption
}

export interface CustomExecutor extends Executor {
  name: string
}
