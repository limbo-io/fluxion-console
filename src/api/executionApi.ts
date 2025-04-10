import http from "@/plugins/axios";
import {PageRequest, PageResponse} from "@/types/request";
import {TriggerType} from "@/types/trigger";
import {ExecutableType, ExecutionStatus} from "@/types/execute";

export interface ExecutionView {
  executionId: string
  status: ExecutionStatus
  triggerAt: number
  startAt?: number
  endAt?: number

  triggerId: string
  triggerType: TriggerType

  executableType: ExecutableType
  executableId: string
  executableVersion: string
}

export default {
  page: (data: {
  } & PageRequest): Promise<PageResponse<ExecutionView>> => {
    return http.post('/api/v1/execution/page', data)
  },
}
