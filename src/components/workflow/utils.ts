/*
 * Copyright 2024-2030 Fluxion Team (https://github.com/Fluxion-io).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * 	http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {UUID} from 'uuidjs'
import {FlowNodeProps, IExecutorNode, IWorkflowNode, NodeType} from '@/types/node'
import {XYPosition} from '@vue-flow/core/dist/types/flow'
import {CustomExecutorConfig, ExecutorConfig, ExecutorType} from "@/types/execute";

export const newNodeId = () => {
  return `${UUID.generate()}_node`
}

export const newEdgeId = () => {
  return `${UUID.generate()}_edge`
}

export const newNodeData = (id: string, type: NodeType, name?: string): IWorkflowNode => {
  return {
    id,
    type,
    name: name ?? '',
    extension: new Map<string, any>()
  }
}

export const newNodeProps = (type: NodeType, position: XYPosition): FlowNodeProps => {
  const id = newNodeId()
  switch (type) {
    case NodeType.START:
      return {
        id,
        type: 'custom',
        position,
        data: newNodeData(id, type, '开始'),
      }
    case NodeType.END:
      return {
        id,
        type: 'custom',
        position,
        data: newNodeData(id, type, '结束'),
      }
    case NodeType.EXECUTOR:
      return {
        id,
        type: 'custom',
        position,
        data: newNodeData(id, type, '执行器'),
      }
    default:
      return {
        id,
        type: 'hidden',
        position,
        data: newNodeData(id, type),
      }
  }
}

export const newExecutorNodeProps = (type: ExecutorType, position: XYPosition): FlowNodeProps => {
  const id = newNodeId()
  let executor: ExecutorConfig
  switch (type) {
    case ExecutorType.CUSTOM: {
      executor = {
        type: type,
        name: ''
      } as CustomExecutorConfig
      break
    }
  }
  const node: IExecutorNode = {
    id,
    type: NodeType.EXECUTOR,
    name: '执行器',
    extension: new Map<string, any>(),
    executor: executor
  }
  return {
    id,
    type: 'custom',
    position,
    data: node,
  }
}
