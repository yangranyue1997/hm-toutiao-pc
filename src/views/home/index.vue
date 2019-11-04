<template>
  <el-container class="container">
    <!-- 侧边栏 -->
    <!-- 然后通过isOpen控制宽度200px到64px--->
    <el-aside :width="isOpen?'200px':'64px'">
      <!-- logo图片 -->
      <!-- 然后通过isOpen控制大小logo的切换--->
      <div class="logo" :class="{smallLogo:!isOpen}"></div>
      <!-- 导航菜单 -->
      <el-menu
        default-active="/"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="!isOpen"
        :collapse-transition="false"
        style="border-right:none"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>

        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>

        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>

        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>

        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>

        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>

        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <!-- 头部 -->
      <el-header>
        <!-- 1.图标   加icon为了加样式 -->
        <span class="el-icon-s-fold icon" @click="toggleMenu"></span>
        <!-- 2.文字   加text为了加样式  -->
        <span class="text">江苏传智播客科技教育有限公司</span>
        <!-- 3.下拉菜单组件 -->
        <el-dropdown class="dropdown" @command="handleClick">
          <span class="el-dropdown-link">
            <!-- 放右侧用户头像 -->
            <img class="headIcon" :src="userInfo.photo" alt />
            <!-- 放右侧用户名称 -->
            <span class="userName">{{userInfo.name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item icon="el-icon-setting" @click.native="setting">个人设置</el-dropdown-item> -->
            <el-dropdown-item icon="el-icon-setting" command="setting">个人设置</el-dropdown-item>
            <!-- <el-dropdown-item icon="el-icon-unlock" @click.native="logout">退出登录</el-dropdown-item> -->
            <el-dropdown-item icon="el-icon-unlock" command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <!-- 欢迎内容 -->
        <!-- 这个地方内容会替换改变 -->
        <!-- 由二级路由对应组件来填充 -->
        <!-- 二级路由组件容器 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import local from '@/utils/local'
export default {
  // 声明@click="toggleMenu"绑定事件
  // 事件需要的数据
  data () {
    return {
      isOpen: true,
      // 通过isOpen控制宽度200px--->64px
      // 申明数据    import local from '@/utils/local'
      userInfo: {}
    }
  },
  // 设置数据
  created () {
    // 设置用户信息
    const user = local.getUser() || {}
    this.userInfo.name = user.name
    this.userInfo.photo = user.photo
  },
  methods: {
    toggleMenu () {
      // 切换左菜单 展开与收起 [需要数据来支撑]
      // 如果isOpen=true ->toggleMenu=false如果isOpen=false ->toggleMenu=true
      this.isOpen = !this.isOpen
    },
    // 个人设置方法
    // 事件根本没有触发  click事件
    // 给组件绑定事件，如果组件不支持，事件不会触发。
    // 把事件绑定在 组件解析后的原生dom上
    // 事件修饰符：prevent once stop  native意思是把事件绑定在原生dom上
    setting () {
      // 跳转到个人设置
      this.$router.push('/setting')
    },
    // 退出登录方法
    logout () {
      // 先清理用户信息
      local.delUser()
      // 在跳转
      this.$router.push('/login')
    },
    handleClick (command) {
      // command 值  setting | logout
      // this[command]() === this.setting()
      // this[logout]() === this.logout()
      // 点击退出登录command值就是logout   点击个人设置command值就是setting
      this[command]()
    }
  }
}
</script>

<style scoped lang='less'>
.container {
  //全屏容器
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  //   边框背景
  .el-aside {
    background: #002033;
    // 侧边栏    logo黑马头条
    .logo {
      width: 100%;
      height: 60px;
      background: #002244 url(../../assets/logo_admin.png) no-repeat center /
        140px auto;
    }
    // 小logo   优先级高所以写在logo下面
    .smallLogo {
      // 只覆盖URL所以是background-image，不是background
      background-image: url(../../assets/logo_admin_01.png);
      background-size: 36px auto;
    }
  }
  //   头部轮廓底边框
  .el-header {
    line-height: 60px;
    border-bottom: 1px solid #ddd;
    .icon {
      font-size: 30px;
      //   以中线对齐
      vertical-align: middle;
    }
    .text {
      margin-left: 10px;
      vertical-align: middle;
    }
    .dropdown {
      float: right;
      .headIcon {
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
      .userName {
        font-weight: bold;
        vertical-align: middle;
        margin-left: 5px;
      }
    }
  }
}
</style>
