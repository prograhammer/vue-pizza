<template lang="pug">
.my-dialog
  v-dialog(v-model='dialogActive' max-width='500px')
    v-card
      v-card-title
        span {{ $store.state.common.dialog.text }}
      v-card-actions
        v-spacer
        v-btn(color='primary' flat='' @click.stop='dialogActive = false') Close
</template>

<script>
export default {
  name: 'DefaultDialog',

  data () {
    return {
      // Dialog settings
      dialog: false
    }
  },

  computed: {
    dialogActive: {
      get () {
        return this.$store.state.common.dialog.show
      },
      set (val) {
        this.$store.dispatch('common/updateDialog', { show: val })
      }
    }
  }
}
</script>

<style lang="stylus">

</style>
