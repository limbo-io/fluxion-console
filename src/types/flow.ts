import {IFlowNode} from "@/types/node";
import {TriggerConfig} from "@/types/trigger";

export interface FlowEdge {
  /**
   * Source node id
   */
  sourceNodeId: String
  /**
   * Target node id
   */
  targetNodeId: String
  /**
   * Source handle id
   */
  sourceHandleId: String
  /**
   * Target handle id
   */
  targetHandleId: String
}

export interface FlowConfig {
  /**
   * 节点信息
   */
  nodes: IFlowNode[]
  /**
   * 连接信息
   */
  edges: FlowEdge[]
}

export interface IFlow {

  id?: string

  name: string

  description?: string
  /**
   * 运行版本
   */
  runVersion?:string
  /**
   * 草稿版本
   */
  draftVersion?: string
  /**
   * 配置信息
   */
  config?: FlowConfig
  /**
   * 触发器
   */
  triggers?: TriggerConfig[]
}

export interface FlowProps {
  flow: IFlow
}
