import request from '@/config/axios'
import {
  addTempGroupParams,
  editTempGroupParams,
  addTempParams,
  QueryNursingTemplateTypeListParams,
  QueryNursingTemplateListParams,
  SaveNursingTemplateTypeParams,
  SaveNursingTemplateParams
} from './types'
// 保存护理模板类型
export const saveNursingTemplateType = (data: SaveNursingTemplateTypeParams) => {
  return request.post({ url: '/nursingM-api/nursingM/templateType/saveNursingTemplateType', data })
}
// 查询护理模板类型
export const queryNursingTemplateTypeList = (data: QueryNursingTemplateTypeListParams) => {
  return request.post({
    url: '/nursingM-api/nursingM/templateType/queryNursingTemplateTypeList',
    data
  })
}
// 删除护理模板类型
export const deleteNursingTemplateType = (data) => {
  return request.post({
    url: '/nursingM-api/nursingM/templateType/deleteNursingTemplateType',
    data
  })
}
// 查询护理模板
export const queryNursingTemplateList = (data: QueryNursingTemplateListParams) => {
  return request.post({
    url: '/nursingM-api/nursingM/template/queryNursingTemplateList',
    data
  })
}
// 保存护理模板
export const saveNursingTemplate = (data: SaveNursingTemplateParams) => {
  return request.post({
    url: '/nursingM-api/nursingM/template/saveNursingTemplate',
    data
  })
}
// 删除护理模板
export const deleteNursingTemplate = (data) => {
  return request.post({
    url: '/nursingM-api/nursingM/template/deleteNursingTemplate',
    data
  })
}
// 根据模板内容ID查询护理模板数据
export const queryNursingTemplateById = (data) => {
  return request.post({
    url: '/nursingM-api/nursingM/template/queryNursingTemplateById',
    data
  })
}
// 查询员工数据
export const queryStaffData = (data) => {
  return request.post({
    url: '/nursingM-api/nursingM/dataRelation/queryStaffData',
    data
  })
}
// 保存员工数据关系
export const saveStaffDataRelation = (data) => {
  return request.post({
    url: '/nursingM-api/nursingM/dataRelation/saveStaffDataRelation',
    data
  })
}
// 查询科室员工信息
export const queryDeptStaffInfo = (data) => {
  return request.post({
    url: '/nursingM-api/nursingM/dataRelation/queryDeptStaffInfo',
    data
  })
}

// 添加模板组
export const addEventType = (data: addTempGroupParams) => {
  return request.post({ url: 'adverseE-api/adverseE/type/addEventType', data })
}
// 编辑模板组
export const updateEventType = (data: editTempGroupParams) => {
  return request.post({ url: 'adverseE-api/adverseE/type/updateEventType', data })
}
// 删除模板组
export const removeEventType = (data) => {
  return request.post({ url: 'adverseE-api/adverseE/type/removeEventType', data })
}

// 添加上报模板
export const addEventTemplate = (data: addTempParams) => {
  return request.post({ url: 'adverseE-api/adverseE/template/addEventTemplate', data })
}

// 查询模板list
export const queryEventTemplateList = (data) => {
  return request.post({ url: 'adverseE-api/adverseE/template/queryEventTemplateList', data })
}
// 根据模板id查询模板
export const getTemplateById = (data) => {
  return request.get({ url: `adverseE-api/adverseE/template/getTemplateById/${data}` })
}
// 编辑模板
export const updateEventTemplate = (data: addTempParams) => {
  return request.post({ url: 'adverseE-api/adverseE/template/updateEventTemplate', data })
}
// 删除模板
export const removeEventTemplateLogic = (data) => {
  return request.post({ url: 'adverseE-api/adverseE/template/removeEventTemplateLogic', data })
}
// 事件上报 - 科室字典
export const getDeptList = (params) => {
  return request.get({ url: 'adverseE-api/adverseE/deptv2/getDept', params })
}

// 事件上报 - 人员字典
export const getUserInfoList = (params) => {
  return request.get({ url: 'adverseE-api/adverseE/userv2/getUserInfo', params })
}
