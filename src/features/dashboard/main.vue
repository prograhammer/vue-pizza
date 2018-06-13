<template lang="pug">
v-container.my-dashboard(
  fluid
  fill-height
  text-xs-center
  v-bind:grid-list-sm="$vuetify.breakpoint.smAndDown"
  v-bind:grid-list-lg="$vuetify.breakpoint.mdAndUp"
)
  v-layout(row wrap)

    // Top Row
    v-flex(d-flex xs12 sm12 md6)
      v-card
        v-card-title
          .title Sales
        v-card-text(style="position: relative; height: 100%; max-height: 400px;")
          chart(style="height: 100%;")
    v-flex(d-flex xs12 sm12 md6)
      v-card.my-dashboard__pizza-status
        v-card-title
          .title Status
        v-card-text
          v-layout(row wrap)
            v-flex(xs4)
              .sub-title Order
            v-flex(xs4)
              .sub-title Prep
            v-flex(xs4)
              .sub-title Delivery
            v-flex(d-flex xs4)
              v-progress-circular.my-dashboard__order(
                :size="100"
                :width="15"
                :rotate="360"
                :value="45"
                color="accent"
              )
                | 45%

            v-flex(d-flex xs4)
              v-progress-circular(
                :size="100"
                :width="15"
                :rotate="360"
                :value="75"
                color="primary"
              )
                | 75%

            v-flex(d-flex xs4)
              v-progress-circular(
                :size="100"
                :width="15"
                :rotate="360"
                :value="15"
                color="secondary"
              )
                | 15%
            v-flex(d-flex xs12)
              line-chart(style="height: 200px; width: 100%;")

    // Bottom Row
    v-flex(d-flex xs12 sm12 md6)
      v-card
        v-card-title
          .title(style="margin-bottom: 47px;") Todo
        v-date-picker(
          v-model="date"
          min="2016-06-15"
          max="2018-03-20"
          full-width
          :event-color="date => date[9] % 2 ? 'red' : 'yellow'"
          :events="functionEvents"
        )
    v-flex(d-flex xs12 sm12 md6)
      v-card
        v-card-media(src="static/images/mountains.png" height="200px")
          v-layout.my-dashboard__media(column)
            v-card-title(class="white--text pl-5 pt-5")
              .display-1.pl-5.pt-5 Main Contacts
        v-list(two-line)
          v-list-tile(@click="")
            v-list-tile-action
              v-icon phone
            v-list-tile-content
              v-list-tile-title (650) 555-1234
              v-list-tile-sub-title Mobile

</template>

<script>
import store from './store' // eslint-disable-line no-unused-vars
import Chart from './components/chart'
import LineChart from './components/line-chart'

export default {
  name: 'Dashboard',

  components: {
    Chart,
    LineChart
  },

  data () {
    return {
      test: this.$store.state.dashboard.test,
      date: '2018-05-21'
    }
  },

  mounted () {
  },

  methods: {
    updateTest () {
      this.test++
      this.$store.dispatch('dashboard/updateTest', this.test)
    },
    functionEvents (date) {
      const [,, day] = date.split('-')
      return parseInt(day, 10) % 3 === 0
    }
  }
}
</script>

<style lang="stylus">
.my-dashboard

  &__media
    height: 100%
    margin: 0

  .picker__title
    display: none !important

</style>
