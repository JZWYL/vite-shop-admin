import axios, { AxiosRequestConfig } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { store } from '@/store'
import router from '@/router/'
const request = axios.create({
  // baseURL: 'https://shop.fed.lagou.com/api/admin/'
  // baseURL: import.meta.env.VITE_API_BASEURL
  // baseURL: '/admin'
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 统一设置用户 token
  const user = store.state.user
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 控制登录过期的锁
let isRefershing = false
// 响应拦截器
request.interceptors.response.use(function (response) {
  // 统一处理接口响应错误，如：token 无效 服务端异常
  const status = response.data.status
  // 正确
  if (!status || status === 200) {
    return response
  }
  // 错误情况： token无效...
  if (status === 410000) {
    if (isRefershing) return Promise.reject(response)
    isRefershing = true
    ElMessageBox.confirm('您的登录已过期，你可以取消停留在此页面，或确认重新登录', '登录过期', {
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    }).then(() => {
      // 清除过期的登录状态
      store.commit('setUser', null)
      // 跳转登录界面
      router.push({
        name: 'login',
        query: {
          redirect: router.currentRoute.value.fullPath
        }
      })
      // 抛出异常
    }).finally(() => {
      isRefershing = false
    })
    // 内部消化掉业务异常
    return Promise.reject(response)
  }
  // if (response.data.status && response.data.status !== 200) {
  ElMessage.error(response.data.msg || '请求失败，请稍后重试')
  // 手动返回一个promise异常
  return Promise.reject(response)
  // }
  // return response
}, function (error) {
  return Promise.reject(error)
})

// /包装一层请求方法，支持泛型
// export default request
export default <T = any> (config: AxiosRequestConfig) => {
  return request(config).then(res => {
    console.log(res)
    return (res.data.data || res.data) as T
  })
}
