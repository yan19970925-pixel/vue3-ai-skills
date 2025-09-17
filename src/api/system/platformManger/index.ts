import request from '@/config/axios'
const VITE_E_INFETION_URL = import.meta.env.VITE_E_INFETION_URL

// 查询所有输入码类型
export const getInputType = () => {
  return request.post({
    url: '/adminM-api/adminM/platForm/getInputType'
  })
}

// 查询所有字典
export const getInputSettingGroupByName = (data) => {
  return request.post({
    url: '/adminM-api/adminM/platForm/getInputSettingGroupByName',
    data
  })
}

// 查询字典表信息根据字典表名
export const getInputSettingByDataTable = (data) => {
  return request.post({
    url: '/adminM-api/adminM/platForm/getInputSettingByDataTable',
    data
  })
}

// 增加输入法字段
export const addInputSetting = (data) => {
  return request.post({
    url: '/adminM-api/adminM/platForm/addInputSetting',
    data
  })
}
// 新增或修改数据输入法字段
export const operationData = (data) => {
  return request.post({
    url: '/adminM-api/adminM/platForm/operationData',
    data
  })
}
// 删除输入法字段
export const deleteInputSetting = (data) => {
  return request.post({
    url: '/adminM-api/adminM/platForm/deleteInputSetting',
    data
  })
}

// 查询字段信息根据字典表名
export const getDbaColCommentsByDataTable = (data) => {
  return request.post({
    url: '/adminM-api/adminM/platForm/getDbaColCommentsByDataTable',
    data
  })
}

// 导出输入法字段
export const exportInputSettingByDataTable = async (data) => {
  return await request.downloadByPOST({
    url: '/adminM-api/adminM/platForm/exportInputSettingByDataTable',
    data
  })
}
// 导入输入法字段数据
export const importSeting = (data) => {
  return request.post({ url: '/adminM-api/adminM/platForm/importSeting', data })
}
export const getplatList = () => {
  return request.post({ url: '/adminM-api/adminM/platForm/getInputType' })
}
// 保存
export const saveInputType = (data) => {
  return request.post({ url: '/adminM-api/adminM/platForm/saveInputType', data })
}
// 删除
export const deleteInputType = (data) => {
  return request.post({ url: '/adminM-api/adminM/platForm/deleteInputType', data })
}
export const getApplications = () => {
  return request.post({ url: '/adminM-api/adminM/platForm/getApplications' })
}

export const getDeptListAll = () => {
  return request.post({ url: '/adminM-api/adminM/platForm/getDeptListAll' })
}
// 模糊查询
export const getAppConfigerParameterLikeParam = (data) => {
  return request.post({ url: '/adminM-api/adminM/platForm/getAppConfigerParameterLikeParam', data })
}
// 参数管理信息
export const getAppConfigerParameterByLevel = (data) => {
  return request.post({ url: '/adminM-api/adminM/platForm/getAppConfigerParameterByLevel', data })
}
// 配置维护新增
export const addAppConfigerParameter = (data) => {
  return request.post({ url: '/adminM-api/adminM/platForm/addAppConfigerParameter', data })
}
// 配置项定义
export const addAppConfigerBaseinfo = (data) => {
  return request.post({ url: '/adminM-api/adminM/platForm/addAppConfigerBaseinfo', data })
}
// 配置项定义分页
export const getAppConfigerBaseinfo = (data) => {
  return request.post({ url: '/adminM-api/adminM/platForm/getAppConfigerBaseinfo', data })
}
// 修改
export const updateInputType = (data) => {
  return request.post({ url: '/adminM-api/adminM/platForm/updateInputType', data })
}
