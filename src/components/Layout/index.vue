<template>
  <section class="app-wrapper">
    <div class="container">
      <sidebar class="sidebar-container" />
      <div class="main-container">
        <app-nav />
        <app-main />
      </div>
    </div>
    <app-footer class="footer-container" />
  </section>
</template>

<script>
import { AppNav, Sidebar, AppMain, AppFooter } from './components/layout';
export default {
  name: 'index',
  components: {
    AppNav,
    Sidebar,
    AppMain,
    AppFooter
  }
}
</script>

<style lang="scss" scoped></style>
