import request from '@/config/axios'
const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL

export interface UserVO {
  id: number
  username: string
  nickname: string
  deptId: number
  postIds: string[]
  email: string
  mobile: string
  sex: number
  avatar: string
  loginIp: string
  status: number
  remark: string
  loginDate: Date
  createTime: Date
}

// 查询用户管理列表
export const getUserPage = (params: PageParam) => {
  return request.get({ url: ADMIN_API_URL + '/system/user/page', params })
}

// 查询用户详情
export const getUser = (id: number) => {
  return request.get({ url: ADMIN_API_URL + '/system/user/get?id=' + id })
}

// 新增用户
export const createUser = (data: UserVO | Recordable) => {
  return request.post({ url: ADMIN_API_URL + '/system/user/create', data })
}

// 修改用户
export const updateUser = (data: UserVO | Recordable) => {
  return request.put({ url: ADMIN_API_URL + '/system/user/update', data })
}

// 删除用户
export const deleteUser = (id: number) => {
  return request.delete({ url: ADMIN_API_URL + '/system/user/delete?id=' + id })
}

// 导出用户
export const exportUser = (params: any) => {
  return request.download({ url: ADMIN_API_URL + '/system/user/export', params })
}

// 下载用户导入模板
export const importUserTemplate = () => {
  return request.download({ url: ADMIN_API_URL + '/system/user/get-import-template' })
}

// 用户密码重置
export const resetUserPwd = (id: number, password: string) => {
  const data = {
    id,
    password
  }
  return request.put({ url: ADMIN_API_URL + '/system/user/update-password', data: data })
}

// 用户状态修改
export const updateUserStatus = (id: number, status: number) => {
  const data = {
    id,
    status
  }
  return request.put({ url: ADMIN_API_URL + '/system/user/update-status', data: data })
}

// 获取用户精简信息列表
export const getSimpleUserList = () => {
  return request.get({ url: ADMIN_API_URL + '/system/user/list-all-simple' })
}

//
export const queryDeptStaffManagerDict = (data: { deptCode: string }) => {
  return request.post({ url: '/admin-api/infra/perDict/queryDeptStaffManagerDict', data })
}
