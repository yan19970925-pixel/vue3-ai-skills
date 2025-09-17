import request from '@/config/axios'
export const getFimsDictionaryList = (data) => {
  return request.post({ url: '/adminM-api/adminM/manger/getFimsDictionaryList', data })
}
// 新增维护列表
export const insertApplicationDo = (data) => {
  return request.post({ url: '/adminM-api/adminM/manger/insertApplicationDo', data })
}
// 修改维护列表
export const updateApplicationDo = (data) => {
  return request.post({ url: '/adminM-api/adminM/manger/updateApplicationDo', data })
}
// 修改维护列表
export const deleteApplicationDo = (data) => {
  return request.post({ url: '/adminM-api/adminM/manger/deleteApplicationDo', data })
}
// 维护注册
export const getKeyDictList = (data) => {
  return request.post({ url: '/adminM-api/adminM/manger/queryApplicationRegistList', data })
}
// 导入
export const importRegInformation = (data) => {
  return request.post({ url: '/adminM-api/adminM/manger/importRegInformation', data })
}
// 删除
export const deleteRegInformation = () => {
  return request.post({ url: '/adminM-api/adminM/manger/deleteRegInformation' })
}
