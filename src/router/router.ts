import {RouteRecordRaw} from "vue-router";
import Flow from "@/components/flow/Flow.vue";
import Layout from "@/components/layout/Layout.vue";
import FlowLIst from "@/pages/flow/FlowList.vue";
import TriggerList from "@/pages/trigger/TriggerList.vue";
import TriggerConfigEdit from "@/pages/trigger/TriggerConfigEdit.vue";
import AppList from "@/pages/app/AppList.vue";

export const routes: RouteRecordRaw[] = [
  // 放到 '/' 匹配前面优先匹配到
  {
    path: '/flow/edit/:id', component: Flow
  },
  // todo '/' 应该调到首页大盘
  {
    path: '/', component: Layout, children: [
      {path: '/trigger/list', component: TriggerList},
      {path: '/trigger/edit', component: TriggerConfigEdit},
      {path: '/trigger/edit/:id', component: TriggerConfigEdit},
      {path: '/flow/list', component: FlowLIst},
      {path: '/app/list', component: AppList},
    ]
  },
]
