import Vue from 'vue';
import Vuex from 'vuex';
import signInState from './modules/indexState'


Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    token: "",
    userType: "",
    avatar: ""
  },
  modules: {
    signInState
  },
  getters: {
    token(state) {
      return state.token;
    },
    userType(state) {
      return state.userType;
    },
    teacher(state) {
      return state.userType === 'teacher';
    },
    student(state) {
      return state.userType === 'student';
    },
    notLogin(state) {
      return state.userType === '';
    },
    avatar(state) {
      return state.avatar;
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUserType(state, userType) {
      state.userType = userType;
    }
  },
  actions: {
    upIdentification(context, identification) {
      context.commit('setToken', identification.token);
      context.commit('setUserType', identification.userType);
    },
    clearIdentification(context) {
      context.commit('setToken', '');
      context.commit('setUserType', '');
    }
  }

})
