import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/auth/store'
import * as constants from '@/constants'

Vue.use(Vuex)

// Sync with local storage.
if (localStorage.getItem(constants.STORAGE_KEY)) {
  const syncedState = JSON.parse(localStorage.getItem(constants.STORAGE_KEY))
  auth.state = syncedState.auth ? Object.assign(auth.state, syncedState.auth) : auth.state
}

// LocalStorage plugin.
const localStoragePlugin = store => {
  store.subscribe((mutation, state) => {
    const syncedData = { auth: state.auth }

    localStorage.setItem(constants.STORAGE_KEY, JSON.stringify(syncedData))

    if (mutation.type === 'common/clear') {
      localStorage.removeItem(constants.STORAGE_KEY)
    }
  })
}

export { localStoragePlugin }
