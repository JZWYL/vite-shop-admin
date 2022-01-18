import axios, { AxiosRequestConfig } from 'axios'
console.log(import.meta.env.VITE_API_BASEURL)
const request = axios.create({
  // baseURL: 'https://shop.fed.lagou.com/api/admin/'
  // baseURL: import.meta.env.VITE_API_BASEURL
  // baseURL: '/admin'
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 统一设置用户 token
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function (response) {
  // 统一处理接口响应错误，如：token 无效 服务端异常
  return response
}, function (error) {
  return Promise.reject(error)
})

// /包装一层请求方法，支持泛型
// export default request
export default <T = any> (config: AxiosRequestConfig) => {
  return request(config).then(res => {
    return res.data.data as T
  })
}
