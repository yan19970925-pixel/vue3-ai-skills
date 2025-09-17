import request from '@/config/axios'

// 路由
export const getAsysNameRoutesApi = (data: string) => {
  return request.get({ url: '/admin-api/system/auth/sysName-menus?sysName=' + data })
}
/**
 *
 * @param data 系统设置--用户设置
 * @returns
 */

// 体检医生查询
export const getPeDoctorList = (data) => {
  return request.post({ url: '/health-api/health/doctor/getPeDoctorList', data })
}

// 体检医生待选科室
export const getToSelectDept = (data) => {
  return request.post({ url: '/health-api/health/doctor/getToSelectDept', data })
}

// 体检医生已选科室
export const getSelectedDept = (data) => {
  return request.post({ url: '/health-api/health/doctor/getSelectedDept', data })
}
// ==============================================================================||
// 体检医生保存
export const savePeUserMenu = (data) => {
  return request.post({ url: '/health-api/health/doctor/savePeDoctor', data })
}

// 体检医生恢复
export const restorePeDoctor = (data) => {
  return request.post({ url: '/health-api/health/doctor/restorePeDoctor', data })
}

// 体检医生删除
export const delPeDoctor = (data) => {
  return request.post({ url: '/health-api/health/doctor/delPeDoctor', data })
}

// 体检医生新增
export const addPeDoctor = (data) => {
  return request.post({ url: '/health-api/health/doctor/addPeDoctor', data })
}

// 移除医生科室
export const removePeDoctorDept = (data) => {
  return request.post({ url: '/health-api/health/doctor/removePeDoctorDept', data })
}

// 添加选择医生科室
export const addPeDoctorDept = (data) => {
  return request.post({ url: '/health-api/health/doctor/addPeDoctorDept', data })
}
