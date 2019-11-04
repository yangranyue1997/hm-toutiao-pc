<template>
  <div class="container-welcome">
    <!-- 放一张图片--->
    <img src="../../assets/welcome.jpg" alt />
  </div>
</template>

<script>
export default {
  created () {
    // 测试用的Promise   . then:成功  . catch:失败
    this.$http.get('http://ttapi.research.itcast.cn/mp/v1_0/articles').then(res => {
      console.log(res.data)
    }).catch(() => {
      console.log('error')
    })
  }
}
</script>

<style scoped lang='less'>
img {
  display: block;
  margin: 0 auto;
}
</style>
