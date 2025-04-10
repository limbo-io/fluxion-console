import http from "@/plugins/axios";
import {PageRequest, PageResponse} from "@/types/request";

export interface AppView {
  appId: string
  appName: string
}

export default {
  page: (data: {
    name?: string
  } & PageRequest): Promise<PageResponse<AppView>> => {
    return http.post('/api/v1/app/page', data)
  },
}
