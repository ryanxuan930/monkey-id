<template>
    <div class="bg-orange-50 h-screen flex flex-col overflow-auto">
      <div class="flex-grow"></div>
      <div class="bg-white sm:shadow p-5 w-full h-screen sm:w-2/3 md:w-96 sm:h-fit mx-auto">
        <img src="@/assets/monkey_id.svg" alt="monkey id" class="inline-block w-full m-auto max-h-24 p-0" >
        <label class="round-input-label">
          <div class="title">帳號</div>
          <input type="email" class="input" placeholder="abc@xyz.com" v-model="data.account" @keyup.enter="submitAll">
        </label>
        <div v-if="message != null" class="text-red-700 text-sm my-1 text-left">{{ message }}</div>
        <button class="round-full-button" @click="submitAll">重設密碼</button>
        <hr class="my-3">
        <div class="text-lg text-gray-500">返回<router-link to="login" class="hyperlink"></router-link></div>
      </div>
      <div class="flex-grow"></div>
    </div>
  </template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import VueRequest from '@/vue-request';
import type { Ref } from 'vue';

export default defineComponent({
  setup() {
    const router = useRouter();
    const message: Ref<string|null> = ref(null);
    const vr = new VueRequest();
    const data = reactive({
      account: '',
    });
      interface IResetResponse {
        status: string;
        message?: string;
      }
      function submitAll() {
        vr.Post('auth/user/reset', data).then((res: IResetResponse) => {
          if (res.status === 'A01') {
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
      };
  },
});
</script>
