export interface PageRequest {
  pageSize?: number
  current?: number
}

export interface Response<T> {
  code: string,
  message?: string,
  data?: T
}

export interface PageResponse<T> extends Response<T[]>{
  total: number,
  hasNext: boolean,
}
