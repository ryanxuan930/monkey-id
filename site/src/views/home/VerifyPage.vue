<template>
  <div class="bg-orange-50 h-screen flex flex-col overflow-auto">
    <div class="flex-grow min-h-[1em]"></div>
    <div class="bg-white sm:shadow p-5 w-full h-screen sm:w-2/3 md:w-96 sm:h-fit mx-auto">
      <div class="text-left">
        <router-link class="text-lg hyperlink" to="/">回上一頁</router-link>
      </div>
      <hr class="mt-3">
      <!--Select Verification Method-->
      <label class="round-input-label">
        <div class="title">請選擇驗證方式</div>
        <select class="select" v-model="verifyType">
          <option value="0">學校Email信箱驗證</option>
          <option value="1">上傳證明文件</option>
        </select>
      </label>
      <hr>
      <!--Email Verification-->
      <div v-if="verifyType == 0" class="w-full">
        <label class="round-input-label">
          <div class="title">學校Email信箱</div>
          <input type="email" class="input" placeholder="yourid@univname.edu.tw" v-model="email" @keyup.enter="sendVerifyCode">
        </label>
        <button class="round-full-button" @click="sendVerifyCode" :disabled="sendCodeStatus === true && countdown > 0">
          <span v-if="sendCodeStatus === false">發送驗證碼</span>
          <span v-else-if="sendCodeStatus === true && countdown > 0">{{ countdown }}秒後可發送</span>
          <span v-else>重新傳送</span>
        </button>
        <div v-if="sendCodeStatus === true" class="flex text-xl text-gray-500 items-center w-full flex-nowrap box-border">
          <div class="whitespace-nowrap">{{ prefix }} -</div>
          <input type="text" maxlength="6" class="block border-2 py-1 px-5 w-full ml-2 rounded-full flex-grow" v-model="code" @keyup.enter="verifyCode">
          <button class="round-full-button whitespace-nowrap ml-2 w-24" @click="verifyCode">驗證</button>
        </div>
        <div v-if="message != null" class="text-red-700 text-sm text-left my-1">{{ message }}</div>
      </div>
      <!--File Verification-->
      <div v-if="verifyType == 1">
        <label class="round-input-label">
          <div class="title">選擇文件</div>
          <input type="file" id="input" class="input" ref="fileElement" accept="image/png,image/jpg">
          <div v-if="sizeError" class="text-red-700 text-sm my-1">檔案請小於5MB</div>
        </label>
        <button class="round-full-button" @click="upload">上傳</button>
        <div v-if="message != null" class="text-red-700 text-sm text-left my-1">{{ message }}</div>
        <div class="text-sm text-gray-500">當您點下上傳，代表您已同意我們的<a class="hyperlink">隱私權條款</a></div>
      </div>
    </div>
    <div class="flex-grow min-h-[2em]"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import type { Ref } from 'vue';
import VueRequest from '@/vue-request';
import axios from 'axios';

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const vr = new VueRequest(store.state.token);
    const verifyType = ref(0);
    // Email Verification
    const email = ref('');
    const prefix: Ref<string|undefined> = ref('');
    const sendCodeStatus = ref(false);
    const countdown = ref(0);
    const message: Ref<string|null> = ref(null);
    let readyToSent = true;
    function sendVerifyCode() {
      if (readyToSent) {
        readyToSent = false;
        countdown.value = 60;
        vr.Post('auth/user/verify/email', { email: email.value }, null, true, true).then((res: {status: string, prefix?: string, message?: string}) => {
          if (res.status === 'A01') {
            prefix.value = res.prefix;
            message.value = null;
            sendCodeStatus.value = true;
          }
          if (res.message !== undefined) {
            message.value = res.message;
          }
        });
      }
    }
    // verify
    const code = ref('');
    function verifyCode() {
      vr.Post('auth/user/verify/email/code', { code: code.value, prefix: prefix.value }, null, true, true).then((res: {status: string, message?: string}) => {
        if (res.status === 'A04') {
          message.value = null;
          router.push('/');
        }
        if (res.message !== undefined) {
          message.value = res.message;
        }
      });
    }
    // timer
    setInterval(() => {
      if (readyToSent === false && countdown.value <= 0) {
        readyToSent = true;
      } else {
        countdown.value--;
      }
    }, 1000);
    // File Verification
    const fileElement: any = ref(null);
    const sizeError = ref(false);
    function upload() {
      sizeError.value = false;
      for (let i = 0; i < fileElement.value.files.length; i++) {
        if (fileElement.value.files[i].size > 4 * 1024 * 1024) {
          sizeError.value = true;
          return;
        }
      }
      const formData = new FormData();
      formData.append('image', fileElement.value.files[0]);
      axios.post('https://sports.nsysu.edu.tw/monkeyserver/api/auth/user/upload', formData, {
        headers: {
          Authorization: `Bearer ${store.state.token}`,
          'Content-Type': 'multipart/form-data',
        },
      }).then((res: any) => {
        if (res.data.status === 'A05') {
          alert('上傳成功，請靜候審核');
          message.value = null;
          router.push('/');
        }
        if (res.data.message !== undefined) {
          message.value = res.data.message;
        }
      });
    }
    return {
      email,
      verifyType,
      sendCodeStatus,
      sendVerifyCode,
      fileElement,
      upload,
      sizeError,
      prefix,
      countdown,
      message,
      code,
      verifyCode,
    };
  },
});
</script>
