<template>
  <app-container>
    <router-view></router-view>
  </app-container>
</template>

<script>
import AppContainer from './Container';
export default {
  name: 'app-main',
  components: { AppContainer }
}
</script>
