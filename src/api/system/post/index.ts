import request from '@/config/axios'
const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL

export interface PostVO {
  id?: number
  name: string
  code: string
  sort: number
  status: number
  remark: string
  createTime?: Date
}

// 查询岗位列表
export const getPostPage = async (params: PageParam) => {
  return await request.get({ url: ADMIN_API_URL + '/system/post/page', params })
}

// 获取岗位精简信息列表
export const getSimplePostList = async () => {
  return await request.get({ url: ADMIN_API_URL + '/system/post/list-all-simple' })
}

// 查询岗位详情
export const getPost = async (id: number) => {
  return await request.get({ url: ADMIN_API_URL + '/system/post/get?id=' + id })
}

// 新增岗位
export const createPost = async (data: PostVO) => {
  return await request.post({ url: ADMIN_API_URL + '/system/post/create', data })
}

// 修改岗位
export const updatePost = async (data: PostVO) => {
  return await request.put({ url: ADMIN_API_URL + '/system/post/update', data })
}

// 删除岗位
export const deletePost = async (id: number) => {
  return await request.delete({ url: ADMIN_API_URL + '/system/post/delete?id=' + id })
}

// 导出岗位
export const exportPost = async (params) => {
  return await request.download({ url: ADMIN_API_URL + '/system/post/export', params })
}
