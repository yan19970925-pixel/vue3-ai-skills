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
// 查询工作人员信息
export const queryStaffDict = (data: UserVO | Recordable) => {
  return request.post({ url: '/adminM-api/adminM/person/queryStaffDict', data })
}
// 保存工作人员信息
export const saveStaffDict = (data: UserVO | Recordable) => {
  return request.post({ url: '/adminM-api/adminM/person/saveStaffDict', data })
}
// 查询字典
export const queryDictByConfig = (data) => {
  return request.post({
    url: ADMIN_API_URL + '/infra/inputSetting/queryDictByConfig',
    data
  })
}
// 查询所有角色
export const getAllSimple = () => {
  return request.get({ url: ADMIN_API_URL + '/system/role/list-all-simple' })
}
// 删除工作人员信息
export const deleteStaffDict = (data) => {
  return request.post({
    url: '/adminM-api/adminM/person/deleteStaffDict',
    data
  })
}
// 查询工作人员详细信息
export const queryStaffDetail = (data) => {
  return request.post({
    url: '/adminM-api/adminM/person/queryStaffDetail',
    data
  })
}
// 查询已存在组成员
export const queryExistStaffVsGroup = (data) => {
  return request.post({
    url: '/adminM-api/adminM/person/queryExistStaffVsGroup',
    data
  })
}
// 查询候选组成员
export const queryCandidateStaffVsGroup = (data) => {
  return request.post({
    url: '/adminM-api/adminM/person/queryCandidateStaffVsGroup',
    data
  })
}
// 保存工作人员分组
export const saveStaffVsGroup = (data) => {
  return request.post({
    url: '/adminM-api/adminM/person/saveStaffVsGroup',
    data
  })
}
// 删除工作人员分组
export const deleteStaffVsGroup = (data) => {
  return request.post({
    url: '/adminM-api/adminM/person/deleteStaffVsGroup',
    data
  })
}
// 恢复口令
export const restorePasswordSave = (data) => {
  return request.post({
    url: '/adminM-api/adminM/person/restorePassword',
    data
  })
}
