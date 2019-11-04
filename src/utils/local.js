// 封装local模块，本地存储用户信息：// 提供 存储用户信息的相关API

// 存储时sessionStorage.setItem     约定：key=hm-toutiao-pc-84-user-key
const KEY = 'hm-toutiao-pc-84-user-key'
const local = {
  // 存储用户信息   传入user用户信息
  setUser (user) {
    // 把user对象转换成json字符串
    const jsonStr = JSON.stringify(user)
    window.sessionStorage.setItem(KEY, jsonStr)
  },
  // 获取用户信息
  getUser () {
    const jsonStr = window.sessionStorage.getItem(KEY)
    // 转成对象，拿到用户信息
    return JSON.parse(jsonStr)
  },
  // 退出登录  清除用户信息
  delUser () {
    window.sessionStorage.removeItem(KEY)
  }
}

// 导出local
export default local
