<template>
  <section>
    <p> prop: 父级将某个属性传给子级 </p>
    <p> $emit: 子级通过事件机制将值传给父级处理 </p>

    <p> $on: 绑定处理函数 </p>
    <p> $emit: 兄弟间通过触发调用绑定函数 </p>

    <p> vuex 是处理$on/$emit更为复杂关系得模式 </p>

    <p> $attrs: 将所有的非prop/class/style属性指向这个组件的某个特定的子元素 </p>
    <p> listeners: 将所有的非原生事件监听器指向这个组件的某个特定的子元素 </p>

    <p>provide/inject</p>

    <p>作用域插槽: 将孙类组件升华成二级组件，解耦和便于控制样式/绑定/事件</p>

  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  inheritAttrs: false,
  name: 'index',
  computed: {
    ...mapState(['deviceSeriesListByBrandId'])
  },
  methods: {
    ...mapActions('Common', ['getDeviceSeriesListByBrandId'])
  },
  created () {
    console.log('点击到指定TAB才开始加载里面内容/接口')
    this.getDeviceSeriesListByBrandId(123) // 123 is ID
  }
}
</script>

<style lang="scss" scoped>
section {
  width:35%;
  text-align: left;
  background: beige;
  padding: 20px;
  margin:0 auto;
}
</style>
