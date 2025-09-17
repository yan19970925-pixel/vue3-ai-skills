import Mock from 'mockjs'
import setupMock, { successResponseWrap } from '@/utils/setup-mock'

// import { MockParams } from '@/types/mock'

setupMock({
  setup() {
    // Mock.XHR.prototype.withCredentials = true;

    // 用户信息
    Mock.mock(new RegExp('/api/user/test'), () => {
      return successResponseWrap({
        name: '管理员',
        avatar: '',
        email: 'admin@email.com',
        job: 'frontend',
        jobName: '主治医师',
        organization: 'zhuanjiazu',
        organizationName: '专家组',
        location: 'zhengzhou',
        locationName: '郑州',
        introduction: '',
        personalWebsite: '',
        phone: '150****0000',
        registrationDate: '2023-03-10 12:10:00',
        accountId: '15012312300',
        certification: 1
      })
    })

    // 登录
    // Mock.mock(new RegExp('/system/auth/login'), (params: MockParams) => {
    //   const { username, password } = JSON.parse(params.body)
    //   if (!username) {
    //     return failResponseWrap(null, '用户名不能为空', 50000)
    //   }
    //   if (!password) {
    //     return failResponseWrap(null, '密码不能为空', 50000)
    //   }
    //   if (username === 'admin' && password === 'admin') {
    //     window.localStorage.setItem('userRole', 'admin')
    //     return successResponseWrap({
    //       token: '12345'
    //     })
    //   }
    //   if (username === 'user' && password === 'user') {
    //     window.localStorage.setItem('userRole', 'user')
    //     return successResponseWrap({
    //       token: '54321'
    //     })
    //   }
    //   return failResponseWrap(null, '账号或者密码错误', 50000)
    // })

    // 登出
    Mock.mock(new RegExp('/api/user/logout'), () => {
      return successResponseWrap(null)
    })
  }
})
