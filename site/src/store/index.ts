import { createStore } from 'vuex';

export default createStore({
  state: {
    token: '',
    isLogin: false,
    userInfo: {},
    tokenExpire: '',
    loginType: '',
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
    setLoginType(state, loginType: string) {
      state.tokenExpire = loginType;
    },
    reset(state) {
      state.token = '';
      state.isLogin = false;
      state.userInfo = {};
      state.tokenExpire = '';
      state.loginType = '';
    },
  },
  actions: {
  },
  modules: {
  },
});
