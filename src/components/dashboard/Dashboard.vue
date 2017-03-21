<template>
<div class="ev-dashboard">
  <div class="ev-dashboard__heading h1">This is the dashboard</div>


  <div class="card">
    <div class="card-header">
      Example #1
    </div>
    <div class="card-block">
      <h4 class="card-title">Parent-Child Flow</h4>
      <p class="card-text">Communication from the parent flows into the child via props. Parents can listen on events emitted from the child and update their own state accordingly.</p>

      <a href="#" class="btn btn-primary"  @click="addressModalVisible = true">Open child modal</a><br><br>
      The visible status of the modal: <code>{{ addressModalVisible }}</code><br><br>
      The address info: 
      <pre>
{{ addressInfo }}
      </pre>
    </div>
  </div>
  <br>


  <div class="card">
    <div class="card-header">
      Example #2
    </div>
    <div class="card-block">
      <h4 class="card-title">Vuex!</h4>
      <p class="card-text">
        Let's use Vue with Vuex to react and watch for changes in another component. I've stored two values in Vuex to represent different ways state and events can be handled.     

        <div class="alert alert-info" role="alert">
          <strong>Heads up!</strong> Use the search in the navbar and watch the changes in the code block below:
        </div>
        <pre class="text-muted">
  {{ $store.state.appnav }}
        </pre>
        <p>
          <strong>Using Computed Properties</strong><br>
          You can use a stored property in your own computed property to reactively update a value:
    <pre class="text-muted">
      computed: {
        reversedSearchText: function () {
          return this.$store.state.appnav.searchText.split('').reverse().join('')
        }
      }
    </pre>
          The reversed value of the search text is: <code>{{ reversedSearchText }}</code>
        </p>
        <p>
          <strong>Use a Vuex watcher</strong><br>
          Put a watcher on a Vuex property to attach behavior and side-effects to state changes:  
    <pre class="text-muted">
      mounted () {
        this.$store.watch((state) => {
          return state.appnav
        }, (appnav) => {
          // Add some behavior here
          alert('Now you need to make a component to display search results!')
        }, {
          deep: true
        })
      }
    </pre>
          When you perform a search from the navbar above, an alert box should show.       
        </p>
      </p>
    </div>
  </div>
  <br>

  <div class="card">
    <div class="card-header">
      Example #3
    </div>
    <div class="card-block">
      <h4 class="card-title">Accessing Secure Resources</h4>
      <p class="card-text">Click the button below to access a protected list of your friends. You can wait for the access token to expire, then notice that the token is automatically renewed for you (see Auth.js).</p>
      <div class="alert alert-danger" v-if="error">
        <p>{{ error }}</p>
      </div>
      <spinner v-show="isLoadingFriends"></spinner>
      <button class="btn btn-primary" @click="getFriends()">Get friends</button><br><br>
      <div>Friends: {{ friends }}</div>
    </div>
  </div>
  <br>

  <address-modal 
    v-if="addressModalVisible"
    :visible="true"
    @saved="addressInfo = arguments[0]"
    @closed="addressModalVisible = false"
  >
  </address-modal>

</div>
</template>

<script>
import Vue from 'vue'
import AddressModal from './AddressModal.vue'
import Spinner from '@/components/common/Spinner'

export default {
  name: 'dashboard',
  components: { AddressModal, Spinner },

  data () {
    return {
      addressInfo: {
        addressLine1: '',
        addressLine2: '',
        email: '',
        state: '',
        country: '',
        zipcode: ''
      },
      addressModalVisible: false,
      friends: '',
      isLoadingFriends: false,
      error: ''
    }
  },

  computed: {
    reversedSearchText: function () {
      console.log(Vue.options.store)
      return this.$store.state.appnav.searchText.split('').reverse().join('')
    }
  },

  mounted () {
    this.$store.watch((state) => {
      return state.appnav
    }, (appnav) => {
      // Add some behavior here
      alert('Now you need to make a component to display search results!')
    }, {
      deep: true
    })
  },

  methods: {
    getFriends () {
      this.isLoadingFriends = true

      this.$http
        .get('/api/resource')
        .then((response) => {
          this.isLoadingFriends = false
          this.friends = JSON.stringify(response.data.friends)
        })
        .catch((response) => {
          this.isLoadingFriends = false
          this.error = utils.getError(response)
        })
    }
  }
}
</script>

<style lang="scss">
.ev-dashboard {
  margin-top: 60px;
}

</style>
