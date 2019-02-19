export default {
  state: {
    panel: "login"
  },
  namespaced: true,
  getters: {
    isLogin(state) {
      return state.panel === 'login'
    },
    isRegister(state) {
      return state.panel === 'register'
    },
    isValidation(state) {
      return state.panel === 'validation'
    }
  },
  mutations: {
    setPanel(state, panel) {
      state.panel = panel;
    }
  },
  actions: {
    toLogin(context) {
      context.commit('setPanel', 'login')
    },
    toRegister(context) {
      context.commit('setPanel', 'register')
    },
    toValidation(context) {
      context.commit('setPanel', 'validation')
    }
  }
};
