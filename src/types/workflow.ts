import {IWorkflowNode} from "@/types/node";
import {TriggerConfig} from "@/types/trigger";

export interface WorkflowEdge {
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

export interface WorkflowConfig {
  /**
   * 节点信息
   */
  nodes: IWorkflowNode[]
  /**
   * 连接信息
   */
  edges: WorkflowEdge[]
}

export interface IWorkflow {

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
  config?: WorkflowConfig
  /**
   * 触发器
   */
  triggers?: TriggerConfig[]
}

export interface FlowProps {
  workflow: IWorkflow
}
