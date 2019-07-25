<template>
  <section>
    <el-scrollbar wrap-class="scrollbar-wrapper" style="height: 100%;">
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @open="handleOpen"
        @close="handleClose"
      >
        <sidebar-item :routers="permissionRouters" />
      </el-menu>
    </el-scrollbar>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import sidebarItem from './SidebarItem'

export default {
  name: 'Index',
  components: { sidebarItem },
  computed: {
    ...mapGetters(['permissionRouters']),
    routers() {
      return this.$router.options.routes.filter(e => !e.hidden)
    }
  },
  methods: {
    hasChildren(val) {
      return !!(val.children && val.children.length)
    },
    handleOpen() {},
    handleClose() {}
  }
}
</script>

<style lang="scss" scoped></style>
