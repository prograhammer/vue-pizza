<template>
<!-- Fixed navbar -->
<nav class="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse ev-appnav">
  <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <a class="navbar-brand" href="#"><img src="../assets/images/logo.png" class="ev-appnav__logo"></a>
  <div class="collapse navbar-collapse" id="navbarCollapse">

    <!-- Logged in -->
    <template v-if="auth.isLoggedIn">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#">Dashboard <span class="sr-only">(current)</span></a>
        </li>
      </ul>
      <div class="form-inline mt-2 mt-md-0">
        <input class="form-control mr-sm-2" type="text" v-model="searchText" placeholder="Search">
        <button class="ev-appnav__search btn btn-outline-success my-2 my-sm-0" @click="submitSearch()">Search</button>
      </div>
      <ul class="navbar-nav nav-right ev-appnav__logout">
        <li class="nav-item">
          <a href="#" @click="logout()">
            <button class="btn btn-outline-primary">Logout</button>
          </a>
        </li>
      </ul>
    </template>

    <!-- Not logged in -->
    <template v-else>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" to="login">Login <span class="sr-only">(current)</span></router-link>
        </li>
        <li class="nav-item">
          <router-link to="signup" class="nav-link" href="#">Signup</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="https://github.com/prograhammer/example-vue-project/blob/master/README.md">Tutorial</a>
        </li>
      </ul>
    </template>

  </div>
</nav>
</template>

<script>
import Auth from '@/auth'
export default {
  data () {
    return {
      auth: this.$store.state.auth,
      searchText: '',
      searchFlag: ''
    }
  },
  methods: {
    logout () {
      Auth.logout()
    },
    submitSearch () {
      this.$store.commit(
        'APPNAV_SEARCH',
        {
          searchText: this.searchText,
          searchTimestamp: Date.now()
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
/* 
  You can use BEM style even though you are scoped. Helps to reason about
  your styles.
*/
.ev-appnav__logo {
  width: 40px;
}
.ev-appnav__search {
  margin-right: 10px;
}
.ev-appnav__logout {
  margin-top: 1px;
}
</style>
