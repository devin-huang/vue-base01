<template>
  <section class="sys-container">
    <slot />
  </section>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'AppContainer',
  mounted() {
    this.loadMainHeight()
    this.resizeMainHeight()
  },
  methods: {
    ...mapActions('App', ['setClientHeight']),
    loadMainHeight() {
      window.addEventListener('load', () => {
        let mainHeight = this.$el.clientHeight
        this.setClientHeight(mainHeight)
      })
    },
    resizeMainHeight() {
      window.addEventListener('resize', () => {
        let mainHeight = this.$el.clientHeight
        this.setClientHeight(mainHeight)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.sys-container {
  width: 100%;
  height: 100%;
}
</style>
