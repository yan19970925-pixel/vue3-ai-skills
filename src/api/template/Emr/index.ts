import request from '@/config/axios'
import type {
  addMiddleInfoParams,
  addEmrCategoryParams,
  updateEmrCategoryParams,
  insertEmrDictionaryParams,
  updateDictionaryTitleParams,
  insertEmrElementParams,
  listTreeParams,
  updateEmrElementParams
} from './types'

// 后台模板列表树
export const listTree = (params: listTreeParams) => {
  return request.get({ url: '/emr-api/emr/category/listTree', params })
}

// 创建模板组
export const addEmrCategory = (data: addEmrCategoryParams) => {
  return request.post({ url: '/emr-api/emr/category/addEmrCategory', data })
}
// 删除模板组
export const delEmrCategory = (id: string) => {
  return request.delete({ url: '/emr-api/emr/category/' + id })
}
// 修改模板组
export const updateEmrCategory = (data: updateEmrCategoryParams) => {
  return request.post({ url: '/emr-api/emr/category/updateEmrCategory', data })
}
// 修改模板名称等
export const updateEmrCategoryTitle = (data) => {
  return request.post({ url: '/emr-api/emr/category/updateEmrCategoryTitle', data })
}
// 获取模板数据
export const getEmrCategory = (id: string) => {
  return request.get({ url: '/emr-api/emr/category/' + id })
}
// 获取签名详情
export const getEmrCategoryById = (id: string) => {
  return request.get({ url: '/emr-api/emr/signLevel/' + id })
}
//添加病历模板签名等级
export const addSignLevel = (data) => {
  return request.post({ url: '/emr-api/emr/signLevel/addSignLevel', data })
}
//修改病历模板签名等级
export const updateSignLevel = (data) => {
  return request.post({ url: '/emr-api/emr/signLevel/updateSignLevel', data })
}
// 获取病历模板签名级别列表
export const categoryTypeList = (data) => {
  return request.post({ url: '/emr-api/emr/categoryType/getList', data })
}
// 获取字典
export const queryEmrDictionary = () => {
  return request.get({ url: '/emr-api/emr/dictionary/queryEmrDictionary' })
}
// 新增字典
export const insertEmrDictionary = (data: insertEmrDictionaryParams) => {
  return request.post({ url: '/emr-api/emr/dictionary/insertEmrDictionary', data })
}
// 更新字典类名需要改什么传什么
export const updateDictionaryTitle = (data: updateDictionaryTitleParams) => {
  return request.post({ url: '/emr-api/emr/dictionary/updateDictionaryTitle', data })
}
export const updateDictionary = (data: updateDictionaryTitleParams) => {
  return request.post({ url: '/emr-api/emr/dictionary/updateDictionary', data })
}
// 删除字典
export const delDictionary = (id: string) => {
  return request.delete({ url: '/emr-api/emr/dictionary/' + id })
}
// 获取数据元
export const queryEmrElement = () => {
  return request.get({ url: '/emr-api/emr/element/queryEmrElement' })
}
// 新增数据元
export const insertEmrElement = (data: insertEmrElementParams) => {
  return request.post({ url: '/emr-api/emr/element/insertEmrElement', data })
}
// 更新数据元
export const updateEmrElement = (data: updateEmrElementParams) => {
  return request.post({ url: '/emr-api/emr/element/updateEmrElement', data })
}
// 删除数据元
export const delQueryEmrElement = (id: string) => {
  return request.delete({ url: '/emr-api/emr/element/' + id })
}

// 病历文书保存
export const addMiddleInfo = (data: addMiddleInfoParams) => {
  return request.post({ url: '/emr-api/emr/middle/addMiddleInfo', data })
}

// 更新病历文书
export const updateMiddleInfo = (data: addMiddleInfoParams) => {
  return request.post({ url: '/emr-api/emr/middle/updateMiddleInfo', data })
}

// 删除病历文书
export const deleteMiddleById = (id: string) => {
  return request.delete({ url: '/emr-api/emr/middle/' + id })
}

// 病历模板导出
export const categoryExport = (data) => {
  return request.downloadByPOST({ url: '/emr-api/emr/category/export', data })
}

// 获取病历保存documentData
export const getDocumentData = (id) => {
  return request.get({ url: '/emr-api/emr/documentData/' + id })
}

// 查询质控大类
export const getReminderBaseList = () => {
  return request.get({ url: '/emr-api/emr/reminder/emrBaseList' })
}
