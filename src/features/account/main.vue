<template lang="pug">
v-container(fluid fill-height style="padding: 0;")
  v-layout.my-account(column)

    v-tabs.my-account__tabs(
      :color="$vuetify.breakpoint.smAndDown ? 'primary' : ''"
      :dark="$vuetify.breakpoint.smAndDown"
      v-model="currentTab"
      align-with-title
      :class="{ 'my-account__mobile-tabs': $vuetify.breakpoint.mdAndUp }"
      style="position: fixed; width: 100%; z-index: 1; background: #F4F4F4;"
    )
      // @TODO: Paths don't matter here, only route names. Need to report this issue to Vuetify.
      v-tab(v-bind:to="{ name: 'account', path: '/account' }" ripple) Profile
      v-tab(v-bind:to="{ name: 'billing', path: '/billing' }" ripple) Billing
      v-tab(v-bind:to="{ name: 'premium', path: '/premium' }" ripple) Premium

    v-container(
      fluid
      fill-height
      v-bind:grid-list-sm="$vuetify.breakpoint.smAndDown"
      v-bind:grid-list-lg="$vuetify.breakpoint.mdAndUp"
      style="position: relative; margin-top: 40px;"
    )

      v-layout(v-show="showPage" row wrap)

        v-flex(d-flex xs12)

        // Column left
        v-flex(d-flex xs12 md3 lg4)

        // Column right
        v-flex(d-flex xs12 md6 lg4)
          v-layout(column)
            v-flex(d-flex)
              v-card
                v-card-text
                  v-layout
                    v-flex
                      Gravatar(:email="profile.email" :size="110")
                      // img.app-avatar(src="../../assets/images/profile.jpg")
                      br
                      a.my-account__avatar-link(href="#") Update Avatar
                    v-flex.px-2
                      | {{ profile.name }}
                      v-btn(flat icon color="primary")
                        v-icon edit
                      br
                      | Joined: January 2017
                      br
                      | Last login: 3:40PM EST 4/15/2017

            v-flex(d-flex)
              v-card(flat)
                v-card-title
                  .title Credentials
                v-card-text
                  v-layout(row wrap style="align-items: center;")
                    v-flex(d-flex xs12 sm12 md6)
                      | Email Address
                    v-flex(dflex xs12 sm12 md6)
                      v-layout(style="align-items: center;")
                        v-flex.text-xs-left(md6) {{ profile.email }}
                        v-flex.text-xs-right(md6)
                          v-btn(flat icon color="primary")
                            v-icon edit
                    v-flex(d-flex xs12 sm12 md6)
                      | Password
                    v-flex(dflex xs12 sm12 md6)
                      v-layout(style="align-items: center;")
                        v-flex.text-xs-left(md6) *********
                        v-flex.text-xs-right(md6)
                          v-btn(flat icon color="primary")
                            v-icon edit

            v-flex(d-flex)
              v-card(flat)
                v-card-title
                  .title Phone
                v-card-text
                  v-layout(style="align-items: center;")
                    v-flex
                      | +1 12343374839
                    v-flex.text-xs-right
                      v-btn(flat icon color="primary")
                        v-icon edit

            v-flex(d-flex)
              v-card(flat)
                v-card-title
                  .title Address
                v-card-text
                  v-layout
                    v-flex
                      | {{ profile.addressLine1 }}
                      template(v-if="profile.addressLine2")
                        br
                        | {{ profile.addressLine2 }}
                      br
                      | {{ profile.city ? profile.city + ', ' : '' }}
                      | {{ profile.state }} {{ profile.zipcode }}
                      br
                      | {{ profile.country }}
                    v-flex.text-xs-right
                      v-btn(flat icon color="primary" @click="openDialogFull('AddressEdit')")
                        v-icon edit

            v-flex(d-flex)
              v-card(flat)
                v-card-title
                  .title Account Options
                v-card-text
                  v-layout

    v-dialog(
      v-model="dialogFullActive"
      fullscreen
      transition="dialog-bottom-transition"
      :overlay=false
      scrollable
    )
      component(:is="dialogFullComp" :active.sync="dialogFullActive")

</template>

<script>
import AppFooter from '@/components/app-footer'
import AppBar from '@/components/app-bar'
import Service from './service'
import AddressEdit from './components/address-edit'
import Gravatar from 'vue-gravatar'

export default {
  name: 'Account',
  service: new Service(),

  components: {
    AppBar,
    AppFooter,
    Gravatar
  },

  data () {
    return {
      loading: false,
      showPage: false,
      oops: false,
      currentTab: '/account',
      dialogFullActive: false,
      dialogFullComp: null,
      profile: {
        email: '',
        name: '',
        country: '',
        addressLine1: '',
        addressLine2: '',
        state: '',
        zipcode: ''
      }
    }
  },

  mounted () {
    // this.$store.dispatch('common/updateToolbar', {
    //  elevation: false
    // })

    this.refreshData()
  },

  methods: {
    openDialogFull (comp) {
      if (comp === 'AddressEdit') this.dialogFullComp = AddressEdit

      this.dialogFullActive = true
    },

    refreshData () {
      this.loading = true
      this.oops = false

      this.$options.service.getProfile()
        .then((data) => {
          this.profile = data
          this.showPage = true
          this.loading = false
        })
        .catch((error) => {
          this.$store.dispatch('common/updateDialog', { show: true, text: 'Error: ' + error.message })
          this.oops = true
          this.loading = false
        })
    }
  }
}
</script>

<style lang="stylus">
  .my-account

    &__avatar-link
      padding-left: 10px

    &__oops
      width: 100px
      padding-bottom: 15px

    .tabs__bar
      background: #F4F4F4

    &__mobile-tabs
      .tabs__item--active
        color: $app-primary
</style>
