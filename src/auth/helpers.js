import Vue from 'vue'
import { router } from '@/http'
import store from '@/store'
import auth from './'

const LOGIN_URL = '/auth'

// const CLIENT_SECRET = 'ZGVtb2FwcDpkZW1vcGFzcw==' // Base64(client_id:client_secret) "demoapp:demopass"

export default {
  URLSearchParams (obj) {
    var params = new URLSearchParams()

    for (var [key, value] of Object.entries(obj)) params.append(key, value)

    return params
  },

  login (creds, redirect, callback) {
    return Vue.http({
      method: 'post',
      url: LOGIN_URL,
      // headers: {
      //  'Authorization': 'Basic ' + CLIENT_SECRET,
      //  'Content-Type': 'application/x-www-form-urlencoded'
      // },
      data: this.URLSearchParams({
        grant_type: 'password',
        client_id: 'demoapp',
        client_secret: 'demopass',
        username: creds.username,
        password: creds.password
      })
    })
      .then((response) => {
        auth.storeToken(response)

        if (redirect) router.push({ name: redirect })
        return response
      })
      .catch((error) => {
        let errorMessage = null

        if (error.response) errorMessage = error.response.status
        else if (error.request) errorMessage = 'no response from server'
        else errorMessage = error.message

        return errorMessage
      })
  },

  logout () {
    store.dispatch('common/clear')
    router.push({ name: 'login' })
  },

  fakeLogin (creds, redirect) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        auth.storeToken({data: { accessToken: '123456789', refreshToken: '77777777' }})
        if (redirect) router.push({ name: redirect })
        resolve({})
      }, 500)
    })
  },

  // Standardizes errors. A place to add logging if needed.
  get (url, params = {}) {
    const config = {
      params: {
        username: store.state.auth.user.id,
        orgId: store.state.auth.user.orgId
      }
    }

    config.params = Object.assign(config.params, params)

    return Vue.auth.get(url, config)
      .then((response) => {
        return new Promise((resolve) => {
          // @TODO check for no response.data.data?
          resolve(response.data.data)
        })
      })
      .catch((error) => {
        // Standardize errors.
        let errorMessage = null

        if (error.response) {
          errorMessage = error.response.statusText || error.response.status
        } else if (error.request) {
          errorMessage = 'no response from server'
        } else {
          errorMessage = error.message
        }

        return new Promise((resolve, reject) => {
          reject(new Error(errorMessage))
        })
      })
  },

  put (url, data = {}) {
    const config = {}

    const defaultData = {
      username: store.state.auth.user.id,
      orgId: store.state.auth.user.orgId
    }

    data = Object.assign(defaultData, data)

    // console.log(settings.data)

    return Vue.auth.put(url, data, config)
      .then((response) => {
        if (response.data.errors) {
          return new Promise((resolve, reject) => {
            reject(new Error(response.data.errors[0].user_message))
          })
        }

        return new Promise((resolve) => {
          // @TODO check for no response.data.data?
          resolve(response.data.data)
        })
      })
      .catch((error) => {
        // Standardize errors.
        let errorMessage = null

        if (error.response) {
          errorMessage = error.response.statusText || error.response.status
        } else if (error.request) {
          errorMessage = 'no response from server'
        } else {
          errorMessage = error.message
        }

        return new Promise((resolve, reject) => {
          reject(new Error(errorMessage))
        })
      })
  }
}
