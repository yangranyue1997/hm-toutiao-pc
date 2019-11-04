// 封装一个axios模块
// 导出一个配置好的axios对象----->在main里面导入挂载
import axios from 'axios'
import local from '@/utils/local'
import router from '@/router'

// 对axios进行配置  ----->接口文档1.1
// 基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// ... 很多配置
// axios - 默认配置 添加请求头    键值对：Authorization   Bearer  + 空格 + token字符
// 设置默认的请求头
// if (local.getUser()) {
//   axios.defaults.headers.Authorization = `Bearer ${local.getUser().token}`
// }
// 请求拦截器
axios.interceptors.request.use((config) => {
  // 拦截成功  往headers中加token
  // 可以做if /else判断   或者const user = local.getUser() || {}
  // const user = local.getUser() || {}：如果拿到了，就用，没拿到就用空对象，通过空对象.token不会报错，会返回undefined
  const user = local.getUser() || {}
  config.headers.Authorization = `Bearer ${user.token}`
  return config
}, (err) => {
  // 错误时候，必写的
  return Promise.reject(err)
})

// 响应拦截器
// 拿到response就返回response
axios.interceptors.response.use(res => res, (err) => {
  // 获取响应状态码   err.response 响应对象  err.response.status 状态码
  if (err.response.status === 401) {
    // 如果是401跳转登录
    // 麻烦  window.location.href = 'http://localhost:8080/#/login'
    // 不推荐 window.location.hash = '#/login'
    // 推荐   使用vue-router进行跳转   上方导入router
    // return终止程序运行，并且跳转到首页
    return router.push('/login')
  }
  return Promise.reject(err)
})
export default axios
