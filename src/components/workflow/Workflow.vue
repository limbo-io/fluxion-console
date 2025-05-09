<!--
  - Copyright 2024-2030 Limbo Team (https://github.com/limbo-io).
  -
  - Licensed under the Apache License, Version 2.0 (the "License");
  - you may not use this file except in compliance with the License.
  - You may obtain a copy of the License at
  -
  - 	http://www.apache.org/licenses/LICENSE-2.0
  -
  - Unless required by applicable law or agreed to in writing, software
  - distributed under the License is distributed on an "AS IS" BASIS,
  - WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  - See the License for the specific language governing permissions and
  - limitations under the License.
  -->
<template>
  <el-container>
    <!-- 头部 -->
    <el-header height="64">
      <el-page-header style="background: white" @back="goBack">
        <template #content>
          <div class="h-center">
            <span class="text-large font-600 mr-3">{{ workflow.name }}</span>
            <el-tooltip
              class="box-item"
              effect="dark"
              placement="bottom-start"
              :content="workflow.description"
            >
              <el-icon class="el-icon--right"><Ellipsis /></el-icon>
            </el-tooltip>
            <el-icon class="el-icon--right" @click="() => {saveDialogOpen = true; saveDialogForm = {
                id: workflow.id ?? '',
                name: workflow.name,
                description: workflow.description
              }}"><SquarePen /></el-icon>
          </div>
        </template>
        <template #extra>
          <div class="flex items-center">
            <el-button class="ml-2" @click="flowDraft">保存</el-button>
            <el-button type="primary" class="ml-2" @click="flowPublish">发布</el-button>
          </div>
        </template>
      </el-page-header>
    </el-header>

    <!-- 页面主体 -->
    <el-main class="relative">
      <VueFlow
        :default-viewport="{ zoom: 1.5 }"
        :max-zoom="4"
        :min-zoom="0.2"
        :nodes="nodes"
        :edges="edges"
        :connection-mode="ConnectionMode.Strict"
        @connect="onConnect"
        @node-click="onNodeClick"
        @pane-ready="onPaneReady"
      >
        <!-- 背景 -->
        <Background :gap="16" pattern-color="#aaa"/>
        <!-- 节点 -->
        <template #node-custom="nodeProps">
          <FNode
            :id="nodeProps.id"
            :data="nodeProps.data"
            :position="nodeProps.position"
          />
        </template>
        <!-- 面板 -->
        <Panel position="top-left">
          <div class="h-center">
            <el-popover
              placement="bottom-start"
              :width="320"
              trigger="click"
            >
              <template #reference>
                <el-button>
                  <el-icon class="el-icon--left"><Plus/></el-icon>添加节点
                </el-button>
              </template>
              <el-row>
                <el-col :span="12"><el-button @click="addExecutor(ExecutorType.CUSTOM)">执行器</el-button></el-col>
              </el-row>
            </el-popover>
          </div>
        </Panel>
      </VueFlow>
    </el-main>
  </el-container>
  <!-- 侧边栏 -->
  <FSidebar ref="flowSidebar"/>
  <!-- 编辑弹窗 -->
  <el-dialog v-model="saveDialogOpen" title="编辑流程" max-width="340">
    <el-form>
      <el-form-item label="名称" label-width="100px">
        <el-input v-model="saveDialogForm.name"/>
      </el-form-item>
      <el-form-item label="描述" label-width="100px">
        <el-input v-model="saveDialogForm.description"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="updateFlow">保存</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {ConnectionMode, MarkerType, Panel, useVueFlow, VueFlow, VueFlowStore} from "@vue-flow/core";
import {Background} from '@vue-flow/background'
import {newExecutorNodeProps, newNodeProps} from '@/components/workflow/utils'
import {FlowNodeProps, IWorkflowNode, NodeExtendKeys, NodeType} from '@/types/node'
import {SquarePen, Ellipsis, Plus} from "lucide-vue-next";
import type {Edge} from "@vue-flow/core/dist/types/edge";
import {WorkflowEdge, IWorkflow} from "@/types/workflow";
import flowApi, {FlowUpdateRequest} from "@/api/workflowApi";
import {ElNotification} from "element-plus";
import {useI18n} from 'vue-i18n'
import {ExecutorType} from "@/types/execute";

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const flowSidebar = ref()
const nodes = ref<FlowNodeProps[]>([])
const edges = ref<Edge[]>([])
const flowInstance = ref<VueFlowStore>()
const { toObject, addEdges } = useVueFlow()
const workflow = ref<IWorkflow>({
  id: '',
  name: ''
})
const saveDialogOpen = ref<boolean>(false)
const saveDialogForm = ref<FlowUpdateRequest>({
  id: '',
  name: '',
})

// 获取流程信息
const loadFlow = (id: string) => {
  flowApi.get(id).then(res => {
    const f = res.data
    if (!f) {
      return
    }
    console.log(f)
    workflow.value = f
    if (f.config) {
      nodes.value = f.config.nodes.map(n => {
        return {
          id: n.id,
          position: n.extension[NodeExtendKeys.POSITION],
          data: n,
          type: 'custom'
        }
      })
      edges.value = f.config.edges.map(e => {
        return {
          source: e.sourceNodeId,
          sourceHandle: e.sourceHandleId,
          target: e.targetNodeId,
          targetHandle: e.targetHandleId,
          markerEnd: MarkerType.ArrowClosed
        } as Edge
      })
    } else {
      nodes.value = initCreateMode()
    }
    console.log(nodes.value)
  })
}

const onNodeClick = ({event, node}) => {
  console.log(node)
  flowSidebar.value.opened(true, node.data)
}

const addExecutor = (type: ExecutorType) => {
  const n = toObject().nodes
  const position = flowInstance.value?.project({x:200, y:200})
  n.push(newExecutorNodeProps(type, position))
  nodes.value = n
}

/**
 * 由于refreshGraph时候会删除无关的节点，这里只需要断开节点连接即可
 *
 * 1. 如果是普通节点
 *  关联父节点和子节点
 * 2. 如果是分支节点
 *  ，父节点关联一个新的隐藏节点
 * 3. 如果是分支节点子节点
 *  断开和父节点的关联，如果父节点没有关联的子节点，执行2
 */
const removeNode = () => {

}

const onConnect = (edge: Edge) => {
  console.log('on connect', edge)
  // source.data.preNodeIds.push(edge.target)
  edge.markerEnd = MarkerType.ArrowClosed
  addEdges(edge)
}

const getFlowData = () => {
  const vf = toObject()
  console.log('vueflow', vf)
  const nodes = vf.nodes.map(n => {
    const data = n.data as IWorkflowNode
    data.extension[NodeExtendKeys.POSITION] = n.position
    return data
  })
  const edges = vf.edges.map(e => {
    return {
      sourceNodeId: e.source,
      sourceHandleId: e.sourceHandle ?? '',
      targetNodeId: e.target,
      targetHandleId: e.targetHandle ?? ''
    } as WorkflowEdge
  })
  return {
    nodes: nodes,
    edges: edges
  }
}

const flowDraft = () => {
  const flowData = getFlowData()
  console.log('flowDraft', flowData)
  flowApi.draft({id: workflow.value.id, config: {nodes: flowData.nodes, edges: flowData.edges}})
}

const flowPublish = () => {
  const flowData = getFlowData()
  console.log('flowPublish', flowData)
  flowApi.publish({id: workflow.value.id, config: {nodes: flowData.nodes, edges: flowData.edges}}).then(res => {
    if (res.data?.suppressInfos && res.data?.suppressInfos?.length > 0) {
      ElNotification({
        title: t('messages.verifyFail'),
        message: res.data?.suppressInfos[0].code,
        type: 'warning',
      })
    }
  })
}

const updateFlow = () => {
  flowApi.update(saveDialogForm.value).then(res => {
    workflow.value.name = saveDialogForm.value.name
    workflow.value.description = saveDialogForm.value.description
    saveDialogOpen.value = false
  })
}

const initCreateMode = () => {
  return [
    newNodeProps(NodeType.START, flowInstance.value?.project({x:100, y:100})),
    newNodeProps(NodeType.END, flowInstance.value?.project({x:800, y:100}))
  ]
}

const goBack = () => {
  router.back()
}

const onPaneReady = (vueFlowInstance: VueFlowStore) => {
  vueFlowInstance.zoomTo(1)
  flowInstance.value = vueFlowInstance

  loadFlow(route.params.id)
}

</script>

<style lang="scss" scoped>
.el-container {

  .el-header {
    padding: 0;
    .el-page-header {
      padding: 16px 24px 16px 24px;
    }
  }
}
</style>
