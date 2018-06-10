<template lang="pug">
.my-billing

  Appbar

  v-tabs.elevation-0(dark v-model="currentTab" color="primary")
    // @TODO: Paths don't matter here, only route names. Make issue to Vuetify.
    v-tab(v-bind:to="{ name: 'account', path: '/account' }" ripple) Profile
    v-tab(v-bind:to="{ name: 'billing', path: '/billing' }" ripple) Billing
    v-tab(v-bind:to="{ name: 'market-link', path: '/market-link' }" ripple) Market Link
    v-tab(v-bind:to="{ name: 'prem-pts', path: '/prem-pts' }" ripple) Premium Points

  .my-billing__hero
    img.my-billing__cone(src='~/@/assets/images/traffic-cone.svg' alt='Under Construction')
    div
      |work-in-progress

</template>

<script>
export default {
  name: 'Billing',

  data () {
    return {
      currentTab: '/billing'
    }
  },

  mounted () {
    // this.$store.dispatch('common/updateToolbar', {
    //  elevation: false
    // })
  },

  methods: {
  }
}
</script>

<style lang="stylus" scoped>
.my-billing
  height 100%

  &__hero
    height 100%
    display flex
    justify-content center
    align-items center
    flex-direction column
    opacity 0.4

  &__cone
    width 100px
</style>
