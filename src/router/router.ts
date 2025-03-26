import {RouteRecordRaw} from "vue-router";
import Workflow from "@/components/workflow/Workflow.vue";
import Layout from "@/components/layout/Layout.vue";
import WorkflowList from "@/pages/workflow/WorkflowList.vue";
import TriggerList from "@/pages/trigger/TriggerList.vue";
import TriggerConfigEdit from "@/pages/trigger/TriggerConfigEdit.vue";
import AppList from "@/pages/app/AppList.vue";

export const routes: RouteRecordRaw[] = [
  // 放到 '/' 匹配前面优先匹配到
  {
    path: '/workflow/edit/:id', component: Workflow
  },
  // todo '/' 应该调到首页大盘
  {
    path: '/', component: Layout, children: [
      {path: '/trigger/list', component: TriggerList},
      {path: '/trigger/edit', component: TriggerConfigEdit},
      {path: '/trigger/edit/:id', component: TriggerConfigEdit},
      {path: '/workflow/list', component: WorkflowList},
      {path: '/workflow/list', component: AppList},
    ]
  },
]
