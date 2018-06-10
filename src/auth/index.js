import Vue from 'vue'
import store from '@/store'
import axios from 'axios'
import * as constants from '@/constants'

// const CLIENT_SECRET = 'demopass' // Base64(client_id:client_secret) "demoapp:demopass"

export default {

  install (Vue, options) {
    Vue.prototype.$auth = Vue.auth = axios.create()

    this.setDefaults()
    this.addInterceptors()
  },

  setDefaults () {
    Vue.auth.defaults.baseURL = constants.API_BASE_URL
  },

  addInterceptors () {
    // Watch for accessToken changes and update our common Auth header.
    store.watch((state) => {
      return state.auth.accessToken
    }, (accessToken) => {
      if (!constants.DEBUG) {
        Vue.auth.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
        Vue.auth.defaults.transformRequest = [(data, headers) => {
          data.access_token = accessToken
          return data
        }]
      }

      if (constants.DEBUG) {
        console.log('token set')
      }
    }, {
      deep: true
    })

    // Intercept the response and refresh (one retry) if invalid token.
    Vue.auth.interceptors.response.use(function (response) {
      if (constants.DEBUG) return Promise.resolve(response)

      if (this.isInvalidToken(response)) {
        return this.refreshToken(response.request)
      }
    }, function (error) {
      return Promise.reject(error)
    })
  },

  isInvalidToken (response) {
    const status = response.status
    const error = response.data.error

    // Customize this to your Oauth server.
    return (status === 401 && (error === 'invalid_token' || error === 'expired_token'))
  },

  refreshToken (request) {
    return axios({
      method: 'post',
      url: constants.REFRESH_TOKEN_URL,
      // headers: {'Authorization': 'Basic ' + CLIENT_SECRET},
      data: {
        grant_type: 'refresh_token',
        refresh_token: store.state.auth.refreshToken
      }
    })
      .then((response) => {
        this.storeToken(response)
        return this.retry(request)
      })
      .catch((errorResponse) => {
        if (this.isInvalidToken(errorResponse)) { this.logout() }
        return errorResponse
      })
  },

  storeToken (response) {
    const auth = store.state.auth

    auth.isLoggedIn = true
    auth.accessToken = response.data.accessToken
    auth.refreshToken = response.data.refreshToken
    // @TODO: get user's name from response from Oauth server.
    auth.user.name = 'David Graham'
    auth.user.id = 'e3f657cb80354820b657cb8035c8208e'

    store.dispatch('auth/update', auth)
  },

  retry (request) {
    return Vue.auth(request)
      .then((response) => { return response })
      .catch((response) => { return response })
  }
}
