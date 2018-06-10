<template lang="pug">
  .my-loading(v-show="loading || oops")
    v-progress-circular(
      v-show="loading"
      ref="progress"
      indeterminate
      v-bind:size="70"
      v-bind:width="7"
      color="primary"
      :style="style"
    )
    .my-loading__oops(ref="oops" v-show="!loading" :style="style")
      img(src='~/@/assets/images/oops.svg' alt='Page Error')
      div
        | Oops!
        br
        | Something went wrong.
</template>

<script>

/**
 * We can expand this component later to have props for progress percentage,
 * different messages, and more, if needed.
 *
 * Note: We don't use a window resize listener as it is not needed. We only
 * need to resize once so the user sees the loader/message initially (as opposed
 * to seeing just a blank white page and the loader being offscreen somewhere).
 */
export default {
  name: 'Loading',

  // Non-reactive data accessible via this.$options.[...].
  loaderOpacity: 0.6,
  transitionAdded: false,
  transitionClearAfterMilliSeconds: 2000,

  props: {
    /**
     * Show a loading progress spinner.
     */
    loading: {
      type: Boolean,
      default: false
    },

    /**
     * Show an "oops, something happened" error message instead of the loading progress spinner.
     */
    oops: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      position: { top: '0px', left: '0px' },
      opacity: this.$options.loaderOpacity
    }
  },

  computed: {
    style () {
      return {
        top: this.position.top,
        left: this.position.left,
        opacity: this.opacity
      }
    }
  },

  watch: {
    /**
     * Watcher to update position after switching to "loading true".
     */
    loading (val) {
      this.updatePosition()
      this.addTransitionListener()
    },

    /**
     * Watcher to update position after switching to "oops true".
     */
    oops (val) {
      this.updatePosition()
      this.addTransitionListener()
    }
  },

  mounted () {
    this.updatePosition()
    this.addTransitionListener()
  },

  beforeDestroy () {
    document.removeEventListener('transitionend', this.updatePosition)
  },

  methods: {
    updatePosition () {
      // Protect from transition listener that is too old or unnecessary calculation.
      if (!this || (!this.loading && !this.oops)) return

      // Update position on the nextTick because "v-show" needs to update first.
      this.$nextTick(() => {
        const { top, left, opacity } = this.calculatePosition()
        this.position.top = top
        this.position.left = left
        this.opacity = opacity
      })
    },

    calculatePosition () {
      // Which element to use? Loading progress or "oops" error?
      const el = this.loading ? this.$refs.progress.$el : this.$refs.oops

      // Get current position, relative to the screen.
      const overlay = this.$el.getBoundingClientRect()
      const rect = el.getBoundingClientRect()

      // Determine boundary (overlay edge if visible, otherwise screen edge).
      const edge = {
        top: overlay.top < 0 ? 0 : overlay.top,
        left: overlay.left < 0 ? 0 : overlay.left,
        bottom: overlay.bottom > window.innerHeight ? window.innerHeight : overlay.bottom,
        right: overlay.right > window.innerWidth ? window.innerWidth : overlay.right
      }

      // Find the center point within the boundary.
      const center = {
        top: Math.ceil((edge.bottom + edge.top - rect.height) / 2),
        left: Math.ceil((edge.right + edge.left - rect.width) / 2)
      }

      // How much do we need to move the element to get it to the center?
      const offset = {
        top: rect.top - center.top,
        left: rect.left - center.left
      }

      // Return new position of element and opacity.
      return {
        top: parseInt(el.style.top) - offset.top + 'px',
        left: parseInt(el.style.left) - offset.left + 'px',
        opacity: this.loading ? this.$options.loaderOpacity : 1
      }
    },

    /**
     * Update position again after all transitions are done.
     * (Don't care about transitions running after the 2 second mark)
     */
    addTransitionListener () {
      if (this.$options.transitionAdded) return

      document.addEventListener('transitionend', this.updatePosition)

      this.transitionAdded = true

      setTimeout(() => {
        document.removeEventListener('transitionend', this.updatePosition)
        this.transitionAdded = false
      }, this.$options.transitionClearAfterMilliSeconds)
    }
  }
}
</script>

<style lang="stylus" scoped>
.my-loading
  position: absolute
  top: 0
  left: 0
  height: 100%
  width: 100%
  z-index: 3
  background-color: white

  &__oops
    text-align: center
    position: absolute
    height: 100px
    width: 150px
</style>
