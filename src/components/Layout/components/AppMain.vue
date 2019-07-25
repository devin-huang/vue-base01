<template>
  <app-container>
    <router-view />
  </app-container>
</template>

<script>
import AppContainer from './Container'
export default {
  name: 'AppMain',
  components: { AppContainer }
}
</script>
