<template>
    <div class="bg-orange-50 h-screen flex flex-col overflow-auto">
      <div class="flex-grow"></div>
      <div class="bg-white sm:shadow p-5 w-full h-screen sm:w-2/3 md:w-96 sm:h-fit mx-auto">
        <img src="@/assets/monkey_id.svg" alt="monkey id" class="inline-block w-full m-auto max-h-24 p-0" >
        <label class="round-input-label">
            <div class="title">重設密碼</div>
            <input type="password" class="input" placeholder="・・・・・・・・" v-model="data.password" ref="passwordInput" @keyup.enter="confirmInput.focus()">
        </label>
        <label class="round-input-label">
            <div class="title">確認密碼</div>
            <input type="password" class="input" placeholder="・・・・・・・・" v-model="passwordConfirm" ref="confirmInput" @keyup.enter="submitAll">
        </label>
        <div v-if="message != null" class="text-red-700 text-sm my-1 text-left">{{ message }}</div>
        <button class="round-full-button" @click="submitAll">重設密碼</button>
        <hr class="my-3">
        <div class="text-lg text-gray-500">返回<router-link to="/login" class="hyperlink">登入</router-link></div>
      </div>
      <div class="flex-grow"></div>
    </div>
  </template>

<script lang="ts">
import {
  defineComponent, reactive, ref, watch,
} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import VueRequest from '@/vue-request';
import type { Ref } from 'vue';

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const message: Ref<string|null> = ref(null);
    const confirmInput: any = ref(null);
    const vr = new VueRequest();
    const data = reactive({
      password: '',
    });
    const passwordConfirm = ref('');
    const errorList = reactive({
      password: {
        filled: false,
        match: false,
        format: false,
      },
    });
    watch(data, () => {
      errorList.password.filled = data.password.length > 0;
      errorList.password.format = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(data.password) || data.password.length === 0;
      errorList.password.match = data.password === passwordConfirm.value;
    });
    watch(passwordConfirm, () => {
      errorList.password.match = data.password === passwordConfirm.value;
    });
    function submitAll() {
      let flag = true;
      Object.values(errorList).forEach((item) => {
        Object.values(item).forEach((value) => {
          if (!value) {
            flag = false;
            return false;
          }
          return true;
        });
        if (!flag) {
          return false;
        }
        return true;
      });
      if (!flag) {
        return;
      }
      interface IResetResponse {
        status: string;
        message?: string;
      }
      vr.Post(`auth/user/reset/password/${route.params.account}/${route.params.token}`, data).then((res: IResetResponse) => {
        if (res.status === 'A01') {
          alert('修改成功');
          router.push('/login');
        }
        if (res.message !== undefined) {
          message.value = res.message;
        }
      });
    }
    return {
      data,
      submitAll,
      message,
      passwordConfirm,
      confirmInput,
    };
  },
});
</script>
