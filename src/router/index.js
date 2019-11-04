import VueRouter from 'vue-router'
import Vue from 'vue'
import local from '@/utils/local'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    // 登录的路由规则
    path: '/login',
    component: Login
  },
  // 首页的路由规则
  {
    path: '/',
    component: Home,
    children: [
      // 欢迎页面
      {
        path: '/',
        component: Welcome
      }
    ]
  },
  // 匹配不符合路由规则的路径显示404组件规则  *通配符
  {
    path: '*',
    component: NotFound
  }
  ]
})

// 添加路由的 导航守卫（前置导航守卫）
// 在跳转路由前去判断。登陆了， 放行。没有登录， 如果不是登录页面的访问， 拦截到登录页面。
router.beforeEach((to, from, next) => {
  // 当每次跳转路由前触发
  // to 跳转到目标 路由对象
  // from 从哪里跳转过来  路由对象
  // next 下一步方法  next()放行  next(‘/login’) 拦截
  // const user = 一个模块.getUser()   import local from '@/utils/local'
  const user = local.getUser()
  // 如果登录
  if (user && user.token) {
    // 放行
    next()
    // 没有登陆，拦截到登录页else
  } else {
    // 不是访问登录页面时，就拦截到登录页面，判断是不是登录地址
    if (to.path === '/login') {
      // 放行
      next()
    } else {
      // 拦截到登录页面
      next('/login')
    }
  }
})
export default router
