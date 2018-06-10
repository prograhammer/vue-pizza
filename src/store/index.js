import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/auth/store'
import common from './common'
import { localStoragePlugin } from './plugins'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { common, auth },
  plugins: [localStoragePlugin]
})
