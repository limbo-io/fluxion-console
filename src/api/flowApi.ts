import http from "@/plugins/axios";
import {PageRequest, PageResponse, Response} from "@/types/request";
import {FlowConfig, IFlow} from "@/types/flow";
import {ValidateSuppressInfo} from "@/types/common";

export interface FlowCreateRequest {
  name: string,
  description?: string
}

export interface FlowUpdateRequest extends FlowCreateRequest {
  id: string,
}

export interface FlowConfigRequest {
  id: string,
  config: FlowConfig
}

export interface FlowPublishResponse {
  version?: string,
  suppressInfos?: ValidateSuppressInfo[]
}

export default {
  create: (request: FlowCreateRequest): Promise<Response<string>> => {
    return http.post('/api/v1/flow/create', request)
  },
  update: (request: FlowUpdateRequest): Promise<Response<void>> => {
    return http.post('/api/v1/flow/update', request)
  },
  draft: (request: FlowConfigRequest): Promise<Response<void>> => {
    return http.post('/api/v1/flow/draft', request)
  },
  publish: (request: FlowConfigRequest): Promise<Response<FlowPublishResponse>> => {
    return http.post('/api/v1/flow/publish', request)
  },
  page: (data: {
    name?: string
  } & PageRequest): Promise<PageResponse<IFlow>> => {
    return http.post('/api/v1/flow/page', data)
  },
  get: (id: string): Promise<Response<IFlow>> => {
    return http.get('/api/v1/flow/get', {
      params: {
        id: id
      }
    })
  },
  delete: (id: string): Promise<Response<void>> => {
    return http.get('/api/v1/flow/delete', {
      params: {
        id: id
      }
    })
  }
}
