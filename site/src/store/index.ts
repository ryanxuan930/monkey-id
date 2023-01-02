import { createStore } from 'vuex';

export default createStore({
  state: {
    token: '',
    isLogin: false,
    userInfo: {},
    tokenExpire: '',
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
    setUserInfo(state, userInfo: any) {
      state.userInfo = userInfo;
    },
    setTokenExpire(state, tokenExpire: string) {
      state.tokenExpire = tokenExpire;
    },
    reset(state) {
      state.token = '';
      state.isLogin = false;
      state.userInfo = {};
      state.tokenExpire = '';
    },
  },
  actions: {
  },
  modules: {
  },
});
