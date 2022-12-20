import { createStore } from 'vuex';

export default createStore({
  state: {
    token: '',
    isLogin: false,
  },
  getters: {
  },
  mutations: {
    setAuthToken(state, authToken: string) {
      state.token = authToken;
    },
    setLoginStatus(state, loginStatus: boolean) {
      state.isLogin = loginStatus;
    },
  },
  actions: {
  },
  modules: {
  },
});
