import request from '@/config/axios'
const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL

export interface OAuth2TokenVO {
  id: number
  accessToken: string
  refreshToken: string
  userId: number
  userType: number
  clientId: string
  createTime: Date
  expiresTime: Date
}

// 查询 token列表
export const getAccessTokenPage = (params: PageParam) => {
  return request.get({ url: ADMIN_API_URL + '/system/oauth2-token/page', params })
}

// 删除 token
export const deleteAccessToken = (accessToken: number) => {
  return request.delete({
    url: ADMIN_API_URL + '/system/oauth2-token/delete?accessToken=' + accessToken
  })
}
