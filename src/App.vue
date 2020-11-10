<template>
  <div id="app">
      <router-view></router-view>
      <back-top></back-top>
  </div>
</template>

<script>
import backTop from './components/goTop/Index'
export default {
  name: 'app',
  components: {
    backTop
  }
}
</script>

<style>

</style>
