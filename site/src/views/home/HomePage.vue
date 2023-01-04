<template>
    <div class="bg-orange-50 h-screen flex flex-col overflow-auto">
      <div class="flex-grow min-h-[1em]"></div>
      <div class="bg-white sm:shadow p-5 w-full h-screen sm:w-2/3 md:w-96 sm:h-fit mx-auto text-gray-600 text-left">
        <div class="text-4xl font-medium mb-1">{{ data.name }}</div>
        <div class="text-lg text-gray-500">{{ data.univ_name_ch_full }}</div>
        <div class="text-lg text-gray-500">{{ identityList[data.identity] }}</div>
        <div class="p-3 border-2 border-gray-300 rounded-xl my-5">
          <template v-if="data.verification == 0">
            <div class="text-2xl font-medium text-gray-700">尚未驗證</div>
            <button class="round-full-button" @click="$router.push('verify')">立即驗證</button>
          </template>
          <template v-if="data.verification == 1 || data.verification == 3">
            <div class="text-2xl font-medium text-orange-600">審核中</div>
            <div class="text-lg text-gray-500">{{ statusList[data.verification] }}</div>
            <button class="round-full-button" @click="$router.push('verify')">重新驗證</button>
          </template>
          <template v-if="data.verification == 2 || (data.verification > 3 && data.verification < 9)">
            <div class="text-2xl font-medium text-red-700">審核未通過</div>
            <div class="text-lg text-gray-500">{{ statusList[data.verification] }}</div>
            <button class="round-full-button" @click="$router.push('verify')">重新驗證</button>
          </template>
          <template v-if="data.verification == 9">
            <div class="text-2xl font-medium text-green-700">身份有效</div>
            <div class="text-lg text-gray-500">有效期限：{{ data.valid_until }}</div>
            <button class="round-full-button" @click="$router.push('verify')">重新驗證</button>
          </template>
        </div>
        <button class="round-full-button" @click="logout">登出</button>
      </div>
      <div class="flex-grow min-h-[1em]"></div>
    </div>
  </template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
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
      router.push('/login');
    }
    vr.Get('auth/user/info', data, true, true).then((res: {[key: string]: string|number|null;}) => {
      if (res.message === 'Unauthenticated.') {
        alert('請重新登入');
        logout();
      }
    });
    return {
      data,
      logout,
      identityList: ['在校學生', '教職員', '畢業校友'],
      statusList: ['尚未驗證', '已發送驗證信', '驗證失敗', '人工審核中', '資料無法辨識', '資料不符', '資料已過期', '請聯繫管理員', '請重新驗證', '審核通過'],
    };
  },
});
</script>
