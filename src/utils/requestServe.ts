import axios from 'axios'
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: '/',
  // 超时
  timeout: 30000
})
service.interceptors.request.use(
  (config) => {
    // 大于30分钟
    // if(timeOut){
    //   clearTimeout(timeOut);
    //   timeOut = setTimeout(()=>{
    //     Message({
    //       message: '登录超时，请重新登录',
    //       type: 'error',
    //       duration: 1000
    //     })
    //     logout(Cookies.get('Admin-Token')).then((res) => {
    //       if(res.code == 200){
    //         Cookies.remove('Admin-Token');
    //         location.reload();
    //         sessionStorage.clear();
    //         timeOut = null;
    //       }
    //     })
    //   },1800000)
    // }else{
    //   timeOut = setTimeout(()=>{
    //     Message({
    //       message: '登录超时，请重新登录',
    //       type: 'error',
    //       duration: 1000
    //     })
    //     logout(Cookies.get('Admin-Token')).then((res) => {
    //       if(res.code == 200){
    //         Cookies.remove('Admin-Token');
    //         location.reload();
    //         sessionStorage.clear();
    //         timeOut = null;
    //       }
    //     })
    //   },1800000)
    // }
    // sessionStorage 存时间
    // if(sessionStorage.getItem('apiTime') && (parseInt(new Date(new Date()) - new Date(sessionStorage.getItem('apiTime'))) / 1000 > 100000)){
    //   Message.error('登录超时，请重新登录');
    //   // request拦截器
    //   logout(Cookies.get('Admin-Token')).then((res) => {
    //     if(res.code == 200){
    //       Cookies.remove('Admin-Token');
    //       location.reload();
    //       sessionStorage.clear();
    //     }
    //   })
    //   return;
    // }
    // sessionStorage.setItem('apiTime',parseTime(new Date()))
    // 超时30分钟
    // get请求映射params参数
    if (config.method === 'get' && config.params) {
      let url = config.url + '?'
      for (const propName of Object.keys(config.params)) {
        const value = config.params[propName]
        const part = encodeURIComponent(propName) + '='
        if (value !== null && typeof value !== 'undefined') {
          if (typeof value === 'object') {
            for (const key of Object.keys(value)) {
              const params = propName + '[' + key + ']'
              const subPart = encodeURIComponent(params) + '='
              url += subPart + encodeURIComponent(value[key]) + '&'
            }
          } else {
            url += part + encodeURIComponent(value) + '&'
          }
        }
      }
      url = url.slice(0, -1)
      config.params = {}
      config.url = url
    }
    return config
  },
  (error) => {
    console.log(error)
    Promise.reject(error)
  }
)
export default service
