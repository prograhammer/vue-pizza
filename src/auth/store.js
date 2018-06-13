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
      state = Object.assign({}, defaults, data)
    },
    clear (state) {
      state = Object.assign(state, defaults)
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
