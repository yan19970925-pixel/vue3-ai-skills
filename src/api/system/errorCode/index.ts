import request from '@/config/axios'
const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL

export interface ErrorCodeVO {
  id: number | undefined
  type: number
  applicationName: string
  code: number | undefined
  message: string
  memo: string
  createTime: Date
}

export interface ErrorCodePageReqVO extends PageParam {
  type?: number
  applicationName?: string
  code?: number
  message?: string
  createTime?: Date[]
}

// 查询错误码列表
export const getErrorCodePageApi = (params: ErrorCodePageReqVO) => {
  return request.get({ url: ADMIN_API_URL + '/system/error-code/page', params })
}

// 查询错误码详情
export const getErrorCodeApi = (id: number) => {
  return request.get({ url: ADMIN_API_URL + '/system/error-code/get?id=' + id })
}

// 新增错误码
export const createErrorCodeApi = (data: ErrorCodeVO) => {
  return request.post({ url: ADMIN_API_URL + '/system/error-code/create', data })
}

// 修改错误码
export const updateErrorCodeApi = (data: ErrorCodeVO) => {
  return request.put({ url: ADMIN_API_URL + '/system/error-code/update', data })
}

// 删除错误码
export const deleteErrorCodeApi = (id: number) => {
  return request.delete({ url: ADMIN_API_URL + '/system/error-code/delete?id=' + id })
}
// 导出错误码
export const excelErrorCodeApi = (params: ErrorCodePageReqVO) => {
  return request.download({ url: ADMIN_API_URL + '/system/error-code/export-excel', params })
}
