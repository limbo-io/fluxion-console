import { Node } from '@vue-flow/core'
import { TriggerConfig } from '@/types/trigger'
import {Executor} from "@/types/execute";

export enum NodeType {
  START = "start",
  EXECUTOR = "executor",
  END = "end",
}

export enum NodeExtendKeys {
  POSITION = "position"
}

export interface IFlowNode {
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
  data: IFlowNode
}

/**
 * @deprecated
 */
export interface ITriggerNode extends IFlowNode {
  triggers: TriggerConfig[]
}

export interface IStartNode extends IFlowNode {
}

export interface IEndNode extends IFlowNode {
}

export interface IExecutorNode extends IFlowNode {
  executor: Executor
}
