const defaults = {
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
  user: {
    name: '',
    id: ''
  }
}

const auth = {
  namespaced: true,

  state: Object.assign({}, defaults),

  mutations: {
    update (state, data) {
      Object.keys(state).forEach(index => {
        state[index] = data[index]
      })
    },
    clear (state) {
      Object.keys(state).forEach(index => {
        state[index] = defaults[index]
      })
    }
  },

  actions: {
    clear ({ state, commit, rootState, dispatch }) {
      commit('clear')
    },
    update ({ state, commit, rootState }, data) {
      commit('update', data)
    }
  }
}

export default auth
