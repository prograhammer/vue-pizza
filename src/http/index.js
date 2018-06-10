import axios from 'axios'
import router from './router'

export const http = {
  install (Vue, options) {
    Vue.prototype.$http = Vue.http = axios.create()
  }
}

export { router }
