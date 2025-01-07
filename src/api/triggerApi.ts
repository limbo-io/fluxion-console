import http from "@/plugins/axios";
import {PageRequest, PageResponse, Response} from "@/types/request";
import {TriggerConfig} from "@/types/trigger";

export interface TriggerCreateRequest {
  refType: string,
  refId: string,
  description?: string
}

export interface TriggerUpdateRequest {
  id: string,
  description?: string
}

export interface TriggerConfigRequest {
  id: string,
  config: TriggerConfig
}

export interface TriggerView {
  id: string,
  type: string,
  refId: string,
  refType: string,
  description?: string,
  config?: TriggerConfig,
  enabled: boolean
}

export default {
  create: (request: TriggerCreateRequest): Promise<Response<string>> => {
    return http.post('/api/v1/trigger/create', request)
  },
  update: (request: TriggerUpdateRequest): Promise<Response<void>> => {
    return http.post('/api/v1/trigger/update', request)
  },
  publish: (request: TriggerConfigRequest): Promise<Response<TriggerConfigRequest>> => {
    return http.post('/api/v1/trigger/publish', request)
  },
  page: (data: {} & PageRequest): Promise<PageResponse<TriggerView>> => {
    return http.post('/api/v1/trigger/page', data)
  },
  get: (id: string): Promise<Response<TriggerView>> => {
    return http.get('/api/v1/trigger/get', {
      params: {
        id: id
      }
    })
  },
  delete: (id: string): Promise<Response<void>> => {
    return http.get('/api/v1/trigger/delete', {
      params: {
        id: id
      }
    })
  }
}
