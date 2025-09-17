import request from '@/utils/requestServe'
// 根据病人id查询模板
export function calogin(data) {
  return request({
    url: '/api-hc-ca',
    method: 'post',
    data: data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}
