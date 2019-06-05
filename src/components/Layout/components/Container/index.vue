<template>
  <section class="sys-container">
    <slot></slot>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'app-container',
  methods: {
    ...mapActions('App', ['setClientHeight']),
    loadMainHeight () {
      window.addEventListener('load', () => {
        let mainHeight = this.$el.clientHeight
        this.setClientHeight(mainHeight)
      })
    },
    resizeMainHeight () {
      window.addEventListener('resize', () => {
        let mainHeight = this.$el.clientHeight
        this.setClientHeight(mainHeight)
      })
    }
  },
  mounted () {
    this.loadMainHeight()
    this.resizeMainHeight()
  }
};
</script>

<style lang="scss" scoped>
.sys-container {
  width: 100%;
  height: 100%;
}
</style>
