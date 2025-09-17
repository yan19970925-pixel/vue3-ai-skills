import request from '@/config/axios'
const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL

export interface DeptVO {
  id?: number
  name: string
  parentId: number
  status: number
  sort: number
  leaderUserId: number
  phone: string
  email: string
  createTime: Date
}

export interface DeptPageReqVO {
  name?: string
  status?: number
}

// 查询部门（精简)列表
export const getSimpleDeptList = async (): Promise<DeptVO[]> => {
  return await request.get({ url: ADMIN_API_URL + '/system/dept/list-all-simple' })
}

// 查询部门列表
export const getDeptPageApi = async (params: DeptPageReqVO) => {
  return await request.get({ url: ADMIN_API_URL + '/system/dept/list', params })
}

// 查询部门详情
export const getDeptApi = async (id: number) => {
  return await request.get({ url: ADMIN_API_URL + '/system/dept/get?id=' + id })
}

// 新增部门
export const createDeptApi = async (data: DeptVO) => {
  return await request.post({ url: ADMIN_API_URL + '/system/dept/create', data: data })
}

// 修改部门
export const updateDeptApi = async (params: DeptVO) => {
  return await request.put({ url: ADMIN_API_URL + '/system/dept/update', data: params })
}

// 删除部门
export const deleteDeptApi = async (id: number) => {
  return await request.delete({ url: ADMIN_API_URL + '/system/dept/delete?id=' + id })
}
