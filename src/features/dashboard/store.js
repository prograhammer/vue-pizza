import store from '@/store'

store.registerModule('dashboard', {
  namespaced: true,

  // State loaded when this component is first loaded.
  state: {
    test: 0
  },

  mutations: {
    updateTest (state, newVal) {
      state.test = newVal
    }
  },

  actions: {
    updateTest ({ state, commit, rootState, dispatch }, newVal) {
      console.log(newVal)
      commit('updateTest', newVal)
    }
  }
})
