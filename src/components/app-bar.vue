<template lang="pug">
  v-toolbar.my-appbar(
    :color="$vuetify.breakpoint.smAndDown ? 'primary' : 'default'"
    :dark="$vuetify.breakpoint.smAndDown"
    flat
    fixed
    app
    dense
  )
    v-toolbar-side-icon(v-show="!backButton" @click.stop="toggleSidebar()")
    v-btn(icon v-show="backButton" @click.stop="$router.back()")
      v-icon arrow_back
    v-toolbar-title.my_appbar__default-title(v-if="!$slots.title") {{ $store.state.common.title }}
    v-toolbar-title.my-appbar__title(v-if="$slots.title && (!$slots.smallTitle || $vuetify.breakpoint.mdAndUp)")
      slot(name="title")
    v-toolbar-title.my-appbar__small-title(v-if="$slots.smallTitle && $vuetify.breakpoint.smAndDown")
      slot(name="smallTitle")
    v-spacer
    .my-appbar__icons(v-if="!$slots.smallIcons || $vuetify.breakpoint.mdAndUp")
      slot(name="icons")
    .my-appbar__small-icons(v-if="$slots.smallIcons && $vuetify.breakpoint.smAndDown")
      slot(name="smallIcons")
</template>

<script>
export default {
  name: 'AppBar',

  props: {
    backButton: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    toggleSidebar () {
      this.$store.dispatch('common/updateSidebar', { visible: !this.$store.state.common.sidebar.visible })
    }
  }
}
</script>

<style lang="stylus">
#app
  .my-appbar

    .toolbar__title
      margin-left: 0

    &__icons
      margin-right: 8px

    &__small-icons
      white-space: nowrap
      margin-right: 5px
      margin-left: 8px

      .btn
        margin: 0 0 0 0

      .btn--flat
        // @TODO: Scoped styles on named slots not working?
        min-width: 40px
</style>
