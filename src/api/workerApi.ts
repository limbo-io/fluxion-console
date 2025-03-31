import http from "@/plugins/axios";
import {PageRequest, PageResponse} from "@/types/request";
import {WorkerStatus} from "@/types/worker";
import {Protocol} from "@/types/common";

export interface WorkerView {
  appId: string
  host: string
  port: number
  status: WorkerStatus
  protocol: Protocol
}

export default {
  page: (data: {
    appId?: string
  } & PageRequest): Promise<PageResponse<WorkerView>> => {
    return http.post('/api/v1/worker/page', data)
  },
}
