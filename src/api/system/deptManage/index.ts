import request from '@/config/axios'

export interface DeptPageReqVO {
  deptCode?: string
}

export interface DictByConfigParams {
  keyWord?: string
  dictType: string
  cons?: string
}

// 查询字典
export const queryDictByConfig = (data: DictByConfigParams) => {
  return request.post({
    url: '/admin-api/infra/inputSetting/queryDictByConfig',
    data
  })
}

// 查询科室信息树状数据
export const deptTreeList = async (data) => {
  return await request.post({ url: '/adminM-api/adminM/dept/deptTreeList', data: data })
}

// 查询某类别下的科室数据
export const deptTreeListLevelNext = async (data: DeptPageReqVO) => {
  return await request.post({ url: '/adminM-api/adminM/dept/deptTreeListLevelNext', data: data })
}

// 新增部门
export const createDeptApi = async (data) => {
  return await request.post({ url: '/system/dept/create', data: data })
}

// 保存科室信息
export const saveDeptInfo = async (params) => {
  return await request.post({
    url: '/adminM-api/adminM/dept/saveDeptInfo',
    data: params
  })
}

// 删除科室信息
export const delDeptInfo = async (data) => {
  return await request.post({
    url: '/adminM-api/adminM/dept/delDeptInfo',
    data: data
  })
}
// 导出科室信息
export const exportDeptInfo = async (data) => {
  return await request.downloadByPOST({
    url: '/adminM-api/adminM/dept/exportDeptInfo',
    data: data
  })
}
// 获取最新的科室序号
export const getDeptMaxSerialNo = async (data) => {
  return await request.post({
    url: '/adminM-api/adminM/dept/getDeptMaxSerialNo',
    data: data
  })
}
// 获取最新的科室编码
export const getDeptMaxCode = async (data) => {
  return await request.post({
    url: '/adminM-api/adminM/dept/getDeptMaxCode',
    data: data
  })
}

// 查询工作组类字典
export const queryStaffGroupClassInfo = async (data) => {
  return await request.post({
    url: '/adminM-api/adminM/dept/queryStaffGroupClassInfo',
    data: data
  })
}
// 查询科室分组信息
export const queryDeptGroupInfo = async (data) => {
  return await request.post({
    url: '/adminM-api/adminM/dept/queryDeptGroupInfo',
    data: data
  })
}
// 保存科室分组信息
export const saveDeptGroupInfo = async (data) => {
  return await request.post({
    url: '/adminM-api/adminM/dept/saveDeptGroupInfo',
    data: data
  })
}
// 删除科室分组信息
export const delDeptGroupInfo = async (data) => {
  return await request.post({
    url: '/adminM-api/adminM/dept/delDeptGroupInfo',
    data: data
  })
}

// 查询护理单元列表
export const chooseWardList = async (data) => {
  return await request.post({
    url: '/adminM-api/adminM/dept/chooseWardList',
    data: data
  })
}
// 查询科室列表
export const chooseDeptList = async (data) => {
  return await request.post({
    url: '/adminM-api/adminM/dept/chooseDeptList',
    data: data
  })
}
// 查询科室护理单元对照信息
export const queryDeptVsWardInfo = async (data) => {
  return await request.post({
    url: '/adminM-api/adminM/dept/queryDeptVsWardInfo',
    data: data
  })
}
// 一键生成科室护理单元对照
export const genDeptVsWard = async (data) => {
  return await request.post({
    url: '/adminM-api/adminM/dept/genDeptVsWard',
    data: data
  })
}
// 新增科室护理单元对照信息
export const addDeptVsWardInfo = async (data) => {
  return await request.post({
    url: '/adminM-api/adminM/dept/addDeptVsWardInfo',
    data: data
  })
}
// 修改科室护理单元对照信息
export const modifyDeptVsWardInfo = async (data) => {
  return await request.post({
    url: '/adminM-api/adminM/dept/modifyDeptVsWardInfo',
    data: data
  })
}
// 删除科室护理单元对照信息
export const delDeptVsWardInfo = async (data) => {
  return await request.post({
    url: '/adminM-api/adminM/dept/delDeptVsWardInfo',
    data: data
  })
}
