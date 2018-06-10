<template lang="pug">
.my-snackbar
  v-snackbar(
    :timeout='$store.state.common.snackbar.timeout'
    :color='$store.state.common.snackbar.color'
    v-model='snackbarActive')
    | {{ $store.state.common.snackbar.text }}
    v-btn(dark='' flat='' @click.native='snackbarActive = false') Close
</template>

<script>
export default {
  name: 'DefaultSnackbar',

  data () {
    return {
    }
  },

  computed: {
    snackbarActive: {
      get () {
        return this.$store.state.common.snackbar.show
      },
      set (val) {
        this.$store.dispatch('common/updateSnackbar', { show: val })
      }
    }
  }
}
</script>

<style lang="stylus">

</style>
