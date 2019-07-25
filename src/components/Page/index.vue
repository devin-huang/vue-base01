<template>
  <section class="page">
    <div class="page-header">
      <slot name="pageHeader" />
    </div>
    <div class="page-main">
      <slot />
    </div>
    <div class="page-footer">
      <slot name="pageFooter" />
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Index',
  computed: {
    // 在Mixins中全局配置，当需要局部改变高度可在组件内使用clientHeight
    // ...mapState({
    //   'clientHeight': state => state.App.clientHeight
    // })
  },
  watch: {
    clientHeight: {
      immediate: true,
      handler() {
        this.autoSetMainHeight()
      }
    }
  },
  mounted() {
    this.autoSetMainHeight()
  },
  methods: {
    ...mapActions('App', ['setTableHeight']),
    autoSetMainHeight() {
      this.$nextTick(() => {
        let tableHeight =
          this.clientHeight -
          (this.$el.children[0].clientHeight +
            this.$el.children[2].clientHeight)
        // 使用mapActions调用vuex App模块方法
        this.setTableHeight(tableHeight)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%;
  .page-main {
    width: inherit;
  }
}
</style>
