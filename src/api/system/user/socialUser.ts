import request from '@/config/axios'
const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL

// 社交绑定，使用 code 授权码
export const socialBind = (type, code, state) => {
  return request.post({
    url: ADMIN_API_URL + '/system/social-user/bind',
    data: {
      type,
      code,
      state
    }
  })
}

// 取消社交绑定
export const socialUnbind = (type, openid) => {
  return request.delete({
    url: ADMIN_API_URL + '/system/social-user/unbind',
    data: {
      type,
      openid
    }
  })
}

// 社交授权的跳转
export const socialAuthRedirect = (type, redirectUri) => {
  return request.get({
    url:
      ADMIN_API_URL +
      '/system/auth/social-auth-redirect?type=' +
      type +
      '&redirectUri=' +
      redirectUri
  })
}
