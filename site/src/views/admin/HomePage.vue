<template>
    <div class="bg-orange-50 h-screen flex flex-col overflow-auto">
      <div class="flex-grow min-h-[1em]"></div>
      <div class="bg-white sm:shadow p-5 w-full h-screen sm:w-2/3 md:w-96 sm:h-fit mx-auto text-gray-600 text-left">
        <div class="text-4xl font-medium mb-1">{{ data.name }}</div>
        <div class="text-lg text-gray-500">{{ data.univ_name_ch_full }}</div>
        <div class="text-lg text-gray-500">{{ permissionList[data.permission] }}</div>
        <hr class="my-5">
        <button class="round-full-button" @click="$router.push('/admin/user')">使用者列表</button>
        <button class="round-full-button" v-if="data.permission > 2">管理員列表</button>
        <hr class="my-5">
        <button class="round-full-button" @click="logout">登出</button>
      </div>
      <div class="flex-grow min-h-[1em]"></div>
    </div>
  </template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import VueRequest from '@/vue-request';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const vr = new VueRequest(store.state.token);
    const data: any = ref({});

    function logout() {
      vr.Post('auth/user/logout', null);
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
    vr.Get('auth/admin/info', data, true, true).then((res: {[key: string]: string|number|null;}) => {
      if (res.message === 'Unauthenticated.') {
        alert('請重新登入');
        logout();
      }
    });
    return {
      data,
      logout,
      permissionList: ['一般管理員', '組織管理員', '系統管理員', '', '', '', '', '', '', '超級管理員'],
    };
  },
});
</script>
