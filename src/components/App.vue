<template>
  <div id="app">
    <app-nav></app-nav>
    <div class="container app-content">
      <router-view></router-view>
    </div>
    <app-footer></app-footer>
  </div>

</template>

<script>
import AppNav from './AppNav.vue'
import AppFooter from './AppFooter.vue'
export default {
  name: 'app',
  components: { AppNav, AppFooter },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
html {
  position: relative;
  min-height: 100%;
}
body {
  /* Margin bottom by footer height */
  margin-bottom: 60px;
}
.app-content {
  padding: 60px 15px 0;
}
</style>
