<template>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();
    try {
      document.cookie = 'accept=true';
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
    } catch (e) {
      alert('本網站必須使用Cookie，您必須要啟用Cookie才能使用本網站');
      console.log(e);
    }
    try {
      if (localStorage.getItem('monkeyIdTemp')) {
        const temp = JSON.parse(localStorage.monkeyIdTemp);
        store.commit('setAuthToken', temp.token);
        store.commit('setLoginStatus', temp.login);
        store.commit('setUserInfo', temp.user);
        store.commit('setTokenExpire', temp.expire);
        store.commit('setLoginType', temp.type);
      }
    } catch (e) {
      console.log(e);
    }
  },
});
</script>

<style lang="scss">
#app {
  font-family: 'Noto Sans TC', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.round-input-label {
  @apply block text-left text-xl md:text-lg text-gray-700 my-3;
  .title {
    @apply p-1;
  }
  .input, .select {
    @apply block w-full px-4 py-1 rounded-full border-2 appearance-none;
  }
}
.round-full-button {
  @apply block py-2 px-5 bg-orange-500 hover:bg-orange-400 duration-200 text-white w-full my-3 rounded-full text-xl md:text-lg;
}
.hyperlink {
  @apply text-orange-500 hover:text-orange-400 duration-200 cursor-pointer;
}
</style>
