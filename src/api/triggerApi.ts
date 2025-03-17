import http from "@/plugins/axios";
import {PageRequest, PageResponse, Response} from "@/types/request";
import {TriggerConfig, TriggerType} from "@/types/trigger";
import {ExecuteConfig} from "@/types/execute";

export interface TriggerCreateRequest {
  name: string
  type: TriggerType
  description?: string
  triggerConfig: TriggerConfig
  executeConfig: ExecuteConfig
}

export interface TriggerUpdateRequest {
  id: string
  name: string
  triggerConfig: TriggerConfig
  executeConfig: ExecuteConfig
  description?: string
}

export interface TriggerView {
  id: string
  name: string
  type: TriggerType
  description?: string
  triggerConfig: TriggerConfig
  executeConfig: ExecuteConfig
  enabled: boolean
}

export default {
  create: (request: TriggerCreateRequest): Promise<Response<string>> => {
    return http.post('/api/v1/trigger/create', request)
  },
  update: (request: TriggerUpdateRequest): Promise<Response<void>> => {
    return http.post('/api/v1/trigger/update', request)
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
  },
  enable: (id: string): Promise<Response<void>> => {
    return http.get('/api/v1/trigger/enable', {
      params: {
        id: id
      }
    })
  },
  disable: (id: string): Promise<Response<void>> => {
    return http.get('/api/v1/trigger/disable', {
      params: {
        id: id
      }
    })
  },
}
