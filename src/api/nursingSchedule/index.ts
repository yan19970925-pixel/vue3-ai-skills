import request from '@/config/axios'
// 查询班次字典
export const queryScheduleDictList = (data: any) => {
  return request.post({ url: '/nursingM-api/nursingM/schedule/queryScheduleDictList', data })
}
// 停启用班次字典
export const stopEnableScheduleDict = (data: any) => {
  return request.post({ url: '/nursingM-api/nursingM/schedule/stopEnableScheduleDict', data })
}
// 保存班次字典
export const saveScheduleDict = (data: any) => {
  return request.post({ url: '/nursingM-api/nursingM/schedule/saveScheduleDict', data })
}
// 查询所管床位
export const queryManagedByBedList = (data: any) => {
  return request.post({ url: '/nursingM-api/nursingM/schedule/queryManagedByBedList', data })
}
// 删除班次字典
export const deleteScheduleDict = (data: any) => {
  return request.post({ url: '/nursingM-api/nursingM/schedule/deleteScheduleDict', data })
}
// 查询护士分组
export const queryNurseGroupList = (data: any) => {
  return request.post({ url: '/nursingM-api/nursingM/schedule/queryNurseGroupList', data })
}
// 删除护士分组字典
export const deleteNurseGroupDict = (data: any) => {
  return request.post({ url: '/nursingM-api/nursingM/schedule/deleteNurseGroupDict', data })
}
// 保存护士分组字典
export const saveNurseGroupDict = (data: any) => {
  return request.post({ url: '/nursingM-api/nursingM/schedule/saveNurseGroupDict', data })
}
// 查询分组人员信息
export const queryNurseGroupPersonnel = (data: any) => {
  return request.post({ url: '/nursingM-api/nursingM/schedule/queryNurseGroupPersonnel', data })
}
// 查询未分组人员
export const queryNurseNoGroupPersonnel = (data: any) => {
  return request.post({ url: '/nursingM-api/nursingM/schedule/queryNurseNoGroupPersonnel', data })
}
// 保存分组人员信息
export const saveNurseGroupPersonnel = (data: any) => {
  return request.post({ url: '/nursingM-api/nursingM/schedule/saveNurseGroupPersonnel', data })
}
// 删除分组人员信息
export const deleteNurseGroupPersonnel = (data: any) => {
  return request.post({ url: '/nursingM-api/nursingM/schedule/deleteNurseGroupPersonnel', data })
}
// 查询人员请假申请
export const queryNursePersonnelAflApply = (data: any) => {
  return request.post({ url: '/nursingM-api/nursingM/schedule/queryNursePersonnelAflApply', data })
}
// 删除人员请假申请
export const deleteNursePersonnelAflApply = (data: any) => {
  return request.post({ url: '/nursingM-api/nursingM/schedule/deleteNursePersonnelAflApply', data })
}
// 保存人员请假申请
export const saveNursePersonnelAflApply = (data: any) => {
  return request.post({ url: '/nursingM-api/nursingM/schedule/saveNursePersonnelAflApply', data })
}
// 提交-审核人员请假申请
export const submitApproveNursePersonnelAflApply = (data: any) => {
  return request.post({
    url: '/nursingM-api/nursingM/schedule/submitApproveNursePersonnelAflApply',
    data
  })
}
// 查询护士排班
export const queryNurseSchedule = (data: any) => {
  return request.post({
    url: '/nursingM-api/nursingM/schedule/queryNurseSchedule',
    data
  })
}
// 保存护士排班
export const saveNurseSchedule = (data: any) => {
  return request.post({
    url: '/nursingM-api/nursingM/schedule/saveNurseSchedule',
    data
  })
}
// 删除护士排班
export const deleteNurseSchedule = (data: any) => {
  return request.post({
    url: '/nursingM-api/nursingM/schedule/deleteNurseSchedule',
    data
  })
}
