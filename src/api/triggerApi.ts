import http from "@/plugins/axios";
import {PageRequest, PageResponse, Response} from "@/types/request";
import {Trigger, TriggerConfig} from "@/types/trigger";

export interface TriggerCreateRequest {
  name: string
  description?: string
}

export interface TriggerUpdateRequest {
  id: string
  name: string
  description?: string
}

export interface TriggerConfigRequest {
  id?: string
  config?: TriggerConfig
}

export default {
  create: (request: TriggerCreateRequest): Promise<Response<string>> => {
    return http.post('/api/v1/trigger/create', request)
  },
  update: (request: TriggerUpdateRequest): Promise<Response<void>> => {
    return http.post('/api/v1/trigger/update', request)
  },
  draft: (request: TriggerConfigRequest): Promise<Response<void>> => {
    return http.post('/api/v1/trigger/draft', request)
  },
  publish: (request: TriggerConfigRequest): Promise<Response<void>> => {
    return http.post('/api/v1/trigger/publish', request)
  },
  page: (data: {} & PageRequest): Promise<PageResponse<Trigger>> => {
    return http.post('/api/v1/trigger/page', data)
  },
  get: (id?: string): Promise<Response<Trigger>> => {
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
