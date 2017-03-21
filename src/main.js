/* Twitter Bootstrap JS (this could also be handled in an app.js file) */
require('bootstrap')

/* Vue */
import Vue from 'vue'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.config.productionTip = false

/* App sass */
import './assets/style/app.scss'

/* App component */
import App from './components/App'

/* Auth plugin */
import Auth from './auth'
Vue.use(Auth)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // Attach the Vue instance to the window,
  // so it's available globally.
  created: function () {
    window.Vue = this
  },
  router,
  store,
  render: h => h(App)
})
