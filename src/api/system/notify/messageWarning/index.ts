import request from '@/config/axios'
// 护士危急值接收
export const receiveAlarmDict = (data) => {
  return request.post({
    url: '/admin-api/infra/alarm/receiveAlarmDict',
    data
  })
}
// 医生危急值接受
export const receiveAlarmDictDoctor = (data) => {
  return request.post({
    url: '/admin-api/infra/alarm/receiveAlarmDictDoctor',
    data
  })
}
// 医生危急值处理
export const handleAlarmDictDoctor = (data) => {
  return request.post({
    url: '/admin-api/infra/alarm/handleAlarmDictDoctor',
    data
  })
}
// 医生危急值处理
export const queryMessageStatus = (data) => {
  return request.post({
    url: '/admin-api/system/message/queryMessageStatus',
    data
  })
}
