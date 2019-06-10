<template>
  <section>
    <p>
      beforeEach => 用于每次加载路由前得处理函数（控制权限 / 初始化加载vuex）
    </p>
    <p>
      afterEach => 用于每次加载路由完毕后得处理函数（回退是仍在之前scroll位置）
    </p>
    <p>addRoutes => 手动更新路由组，注意：视图层也需手动更新</p>
    <p>this.$router => router 实例 (获取所有路由信息)</p>
    <p>this.$route => 当前激活的路由信息对象 (属性为只读)</p>
    <p>append => 配置动态得后代路由：PATH</p>
    <p>组建内：</p>
    <p>beforeRouteEnter</p>
    <p>
      beforeRouteUpdate 组建创建后再次加载不会初始化，则需要该函数实现created
    </p>
    <p>beforeRouteLeave</p>
  </section>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>
