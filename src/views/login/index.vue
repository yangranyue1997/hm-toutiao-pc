<template>
  <!-- 全屏容器（一张背景大图那个） -->
  <div class="container">
    <!-- 卡片容器 el-card是element-ul一个组件，有根元素，根元素上默认添加一个类和组件名称一致-->
    <el-card>
      <!-- logo -->
      <img src="../../assets/logo_index.png" width="200px" alt />
      <!-- 表单 -->
      <!-- 获取vue组件实例:组件加 ref="loginForm" 属性 -->
      <el-form ref="loginForm" status-icon :model="loginForm" :rules="loginRules">
        <!-- 规则放置在这个标签上 -->
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            style="width:235px;margin-right:10px"
            placeholder="请输入验证码"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <!-- 强制同意写:value="true" -->
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" type="primary" style="width:100%">立即登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  // 补充依赖的数据
  data () {
    // 自定义手机号的验证规则在校验规则定义之前 定义函数  在return之前定义
    // 必须有三个参数：(rule, value, callback)
    // 校验手机号的函数
    const checkMobile = (rule, value, callback) => {
      // 通过校验逻辑判断成功失败
      // 手机号格式：1开头 第二位3-9 9个数字结尾
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不对'))
      }
    }
    return {
      loginForm: {
        mobile: '',
        code: ''
      },
      //   校验规则
      loginRules: {
        //   定义规则，放到上边<el-form-item prop="moblie">标签上
        mobile: [
          // type: date|email|url  支持  不支持手机号
          //   自定义校验手机号规则
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          // 验证码输入六位规则  len: 6,长度为6  触发方式，blur失去焦点
          { len: 6, message: '验证码为6位字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 获取表单组件实例 ---> 调用校验函数
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          // 发请求 校验手机号和验证码  后台
          // 接口文档2.1
          this.$http
            .post('authorizations', this.loginForm)
            .then(res => {
              // 成功
              // 跳转到首页
              this.$router.push('/')
            })
            .catch(err => {
              // 失败 进行提示
              console.log(err)
            })
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
// 全屏容器样式
.container {
  width: 100%;
  height: 100%;
  // 背景尺寸 background-size 拆分写法
  // 组合写法 background:    / 背景图尺寸(width,height) 特殊写法： 1）cover 铺面整个容器多余看不见  2）contain 等比例缩放完整的显示在容器内容
  background: url(../../assets/login_bg.jpg) no-repeat center / cover;
  position: absolute;
  left: 0;
  top: 0;
  //   白色卡片样式【嵌套写法】
  .el-card {
    width: 400px;
    height: 340px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      display: block;
      margin: 0 auto 30px;
    }
  }
}
</style>
