import request from '@/config/axios'

// 添加系统管理公共字典数据
export const insertFimsDictonary = async (data) => {
  return await request.post({ url: '/adminM-api/adminM/dictionary/insertFimsDictonary', data })
}
//查询系统管理公共字典列表
export const getFimsDictionaryList = async (data) => {
  return await request.post({ url: '/adminM-api/adminM/dictionary/getFimsDictionaryList', data })
}
//查询系统管理公共字典详情
export const getFimsDictionaryInfo = async (data) => {
  return await request.post({ url: '/adminM-api/adminM/dictionary/getFimsDictionaryInfo', data })
}
//查询系统管理公共校验字典列表
export const getFimsDictionaryCheckList = async (data) => {
  return await request.post({
    url: '/adminM-api/adminM/dictionary/getFimsDictionaryCheckList',
    data
  })
}
//查询系统管理公共校验字典详情
export const getFimsDictionaryCheckInfo = async (data) => {
  return await request.post({
    url: '/adminM-api/adminM/dictionary/getFimsDictionaryCheckInfo',
    data
  })
}
//导出
export const exportDictionary = async (data) => {
  return await request.downloadByPOST({
    url: '/adminM-api/adminM/dictionary/exportDictionary',
    data
  })
}
//删除系统管理公共字典数据
export const deleteDictionary = async (data) => {
  return await request.post({
    url: '/adminM-api/adminM/dictionary/deleteDictionary',
    data
  })
}
//导入
export const importDictionary = async (data) => {
  return await request.post({
    url: '/adminM-api/adminM/dictionary/importDictionary',
    data
  })
}
//查询字典下对应的视图
export const getDictViews = async (data) => {
  return await request.post({
    url: '/adminM-api/adminM/dictionary/getDictViews',
    data
  })
}
//查询字典对应的视图下拉列表
export const getDictViewsSelect = async (data) => {
  return await request.post({
    url: '/adminM-api/adminM/dictionary/getDictViewsSelect',
    data
  })
}
// 上传文件
export const uploadFileApi = (data) => {
  return request.upload({ url: '/adminM-api/adminM/dictionary/uploadFile', data: data })
}
//工作人员查询
export const queryStaffInfo = async (data) => {
  return await request.post({
    url: '/adminM-api/adminM/person/queryStaffInfo',
    data
  })
}
//查询工作人员信息
export const queryStaffDict = async (data) => {
  return await request.post({
    url: '/adminM-api/adminM/person/queryStaffDict',
    data
  })
}
//删除工作人员信息
export const deleteStaffDict = async (data) => {
  return await request.post({
    url: '/adminM-api/adminM/person/deleteStaffDict',
    data
  })
}
//恢复口令
export const restorePassword = async (data) => {
  return await request.post({
    url: '/adminM-api/adminM/person/restorePassword',
    data
  })
}
//保存工作人员信息
export const saveStaffDict = async (data) => {
  return await request.post({
    url: '/adminM-api/adminM/person/saveStaffDict',
    data
  })
}
//查询程序字典
export const queryApplicationsDict = async (data) => {
  return await request.post({
    url: '/adminM-api/adminM/person/queryApplicationsDict',
    data
  })
}
//查询国籍字典 所有字典推荐调用这个接口
export const getDictByConfig = (data) => {
  return request.post({ url: '/admin-api/infra/inputSetting/queryDictByConfig', data })
}
//查询科室组信息
export const queryDeptGroup = (data) => {
  return request.post({ url: '/adminM-api/adminM/person/queryDeptGroup', data })
}
//查询某科室组工作人员信息
export const queryStaffGroup = (data) => {
  return request.post({ url: '/adminM-api/adminM/person/queryStaffGroup', data })
}
//导出科室组工作人员
export const exportStaffGroup = async (data) => {
  return await request.downloadByPOST({ url: '/adminM-api/adminM/person/exportStaffGroup', data })
}
//查询出诊安排一览
export const queryDoctorScheduleOverview = (data) => {
  return request.post({ url: '/adminM-api/adminM/person/queryDoctorScheduleOverview', data })
}
//查询已存在组成员
export const queryExistStaffVsGroup = (data) => {
  return request.post({ url: '/adminM-api/adminM/person/queryExistStaffVsGroup', data })
}
//查询出诊安排
export const queryDoctorSchedule = (data) => {
  return request.post({ url: '/adminM-api/adminM/person/queryDoctorSchedule', data })
}
//保存门诊医生出诊安排
export const saveDoctorSchedule = (data) => {
  return request.post({ url: '/adminM-api/adminM/person/saveDoctorSchedule', data })
}
