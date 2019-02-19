import Vue from 'vue';
import Vuex from 'vuex';
import signInState from './modules/indexState'


Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    token: "",
    userType: "",
    avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550566562163&di=c27a716e5ab0e56d3b76bea704fcefd0&imgtype=0&src=http%3A%2F%2Fhimg2.huanqiu.com%2Fattachment2010%2F2019%2F0217%2F20190217065504901.jpg"
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
    },
    setAvatar(state, avatar) {
      state.avatar = avatar
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
      context.commit('setAvatar', '');
    },
    updateAvatar(context, avatar) {
      context.commit('setAvatar', avatar)
    }
  }

})
