import request from '@/config/axios'
const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL

export interface RoleVO {
  id: number
  name: string
  code: string
  sort: number
  status: number
  type: number
  createTime: Date
}

export interface UpdateStatusReqVO {
  id: number
  status: number
}

// 查询角色列表
export const getRolePage = async (params: PageParam) => {
  return await request.get({ url: ADMIN_API_URL + '/system/role/page', params })
}

// 查询角色（精简)列表
export const getSimpleRoleList = async (): Promise<RoleVO[]> => {
  return await request.get({ url: ADMIN_API_URL + '/system/role/list-all-simple' })
}

// 查询角色详情
export const getRole = async (id: number) => {
  return await request.get({ url: ADMIN_API_URL + '/system/role/get?id=' + id })
}

// 新增角色
export const createRole = async (data: RoleVO) => {
  return await request.post({ url: ADMIN_API_URL + '/system/role/create', data })
}

// 修改角色
export const updateRole = async (data: RoleVO) => {
  return await request.put({ url: ADMIN_API_URL + '/system/role/update', data })
}

// 修改角色状态
export const updateRoleStatus = async (data: UpdateStatusReqVO) => {
  return await request.put({ url: ADMIN_API_URL + '/system/role/update-status', data })
}

// 删除角色
export const deleteRole = async (id: number) => {
  return await request.delete({ url: ADMIN_API_URL + '/system/role/delete?id=' + id })
}
// 导出角色
export const exportRole = (params) => {
  return request.download({
    url: ADMIN_API_URL + '/system/role/export',
    params
  })
}
