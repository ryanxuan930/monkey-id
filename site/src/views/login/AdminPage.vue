<template>
  <div class="bg-orange-50 h-screen flex flex-col overflow-auto">
    <div class="flex-grow"></div>
    <div class="bg-white sm:shadow p-5 w-full h-screen sm:w-2/3 md:w-96 sm:h-fit mx-auto">
      <img src="@/assets/monkey_id.svg" alt="monkey id" class="inline-block w-full m-auto max-h-24 p-0" >
      <div class="text-2xl text-gray-500">管理員登入</div>
      <label class="round-input-label">
        <div class="title">帳號</div>
        <input type="email" class="input" placeholder="abc@xyz.com" v-model="data.account">
      </label>
      <label class="round-input-label">
        <div class="title">密碼</div>
        <input type="password" class="input" placeholder="・・・・・・・・" v-model="data.password">
      </label>
      <button class="round-full-button" @click="submitAll">登入</button>
    </div>
    <div class="flex-grow"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import VueRequest from '@/vue-request';
import { useStore } from 'vuex';
import type { Ref } from 'vue';

export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();
    const accountInput: any = ref(null);
    const passwordInput: any = ref(null);
    const message: Ref<string|null> = ref(null);
    const vr = new VueRequest();
    const data = reactive({
      account: '',
      password: '',
    });
    interface ILoginResponse {
      status: string;
      data: {
        expired: string,
        token: string,
        type: string,
        user: any;
      };
      message?: string;
    }
    function submitAll() {
      vr.Post('auth/admin/login', data).then((res: ILoginResponse) => {
        if (res.status === 'A02') {
          store.commit('setAuthToken', res.data.token);
          store.commit('setLoginStatus', true);
          store.commit('setUserInfo', res.data.user);
          store.commit('setTokenExpire', res.data.expired);
          store.commit('setLoginType', 'admin');
          const temp = {
            token: res.data.token,
            login: true,
            user: res.data.user,
            expire: res.data.expired,
            type: 'admin',
          };
          localStorage.setItem('monkeyIdTemp', JSON.stringify(temp));
          router.push('/admin');
        }
        if (res.message !== undefined) {
          message.value = res.message;
        }
      });
    }
    return {
      accountInput,
      passwordInput,
      data,
      submitAll,
      message,
    };
  },
});
</script>
