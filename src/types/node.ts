import {Node} from '@vue-flow/core'
import {TriggerConfig} from '@/types/trigger'
import {ExecutorConfig} from "@/types/execute";

export enum NodeType {
  START = "start",
  EXECUTOR = "executor",
  END = "end",
}

export enum NodeExtendKeys {
  POSITION = "position"
}

export interface IWorkflowNode {
  /**
   * 唯一标识
   */
  id: string
  /**
   * 节点类型
   */
  type: NodeType
  /**
   * 名称
   */
  name: string
  /**
   * 扩展信息
   */
  extension: object
}

export interface FlowNodeProps extends Node {
  data: IWorkflowNode
}

/**
 * @deprecated
 */
export interface ITriggerNode extends IWorkflowNode {
  triggers: TriggerConfig[]
}

export interface IStartNode extends IWorkflowNode {
}

export interface IEndNode extends IWorkflowNode {
}

export interface IExecutorNode extends IWorkflowNode {
  executor: ExecutorConfig
}
