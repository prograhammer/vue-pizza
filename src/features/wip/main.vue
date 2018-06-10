<template lang="pug">
v-container.my-wip(fluid fill-height text-xs-center)
  v-layout(justify-center align-center)
    v-flex.my-wip__hero(text-xs-center)
      img.my-wip__cone(src='~/@/assets/images/traffic-cone.svg' alt='Work-in-progress')
      div
        |Work-in-progress

</template>

<script>
export default {
  name: 'Wip',

  data () {
    return {
    }
  },

  mounted () {
  },

  methods: {

  }
}
</script>

<style lang="stylus" scoped>
.my-wip

  &__hero
    opacity 0.4

  &__cone
    width 100px

</style>
