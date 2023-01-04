<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup(props) {
    const store = useStore();
    const router = useRouter();
    function logout() {
      store.commit('reset');
      try {
        if (localStorage.getItem('monkeyIdTemp')) {
          localStorage.removeItem('monkeyIdTemp');
        }
      } catch (e) {
        console.log(e);
      }
      router.push('/login/admin');
    }
    function checkLogin() {
      if (store.state.isLogin) {
        const expire = new Date(store.state.expire).getTime();
        const current = Date.now();
        if (expire <= current) {
          alert('已過期，請重新登入');
          logout();
        }
      } else if (store.state.isLogin === false) {
        alert('請先登入');
        logout();
      }
    }
    checkLogin();
    return {
      logout,
    };
  },
});
</script>
