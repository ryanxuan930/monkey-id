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
      <div v-if="verifyType == 0">
        <label class="round-input-label">
          <div class="title">學校Email信箱</div>
          <input type="email" class="input" placeholder="yourid@univname.edu.tw">
        </label>
        <button class="round-full-button" @click="sendVerifyCode">
          <span v-if="sendCodeStatus === false">發送驗證碼</span>
          <span v-else>重新傳送</span>
        </button>
        <div v-if="sendCodeStatus === true" class="flex text-xl text-gray-500 items-center">
          <div class="flex-shrink-0">ABCD -</div>
          <input type="text" maxlength="6" class="block border-2 py-1 px-5 rounded-full ml-2 flex-grow box-border">
          <button class="round-full-button">驗證</button>
        </div>
      </div>
      <!--File Verification-->
      <div v-if="verifyType == 1">
        <label class="round-input-label">
          <div class="title">選擇文件</div>
          <input type="file" id="input" class="input" ref="fileElement" @change="upload()">
          <div v-if="sizeError" class="text-red-700 text-sm my-1">檔案請小於5MB</div>
        </label>
        <button class="round-full-button">上傳</button>
        <div class="text-sm text-gray-500">當您點下上傳，代表您已同意我們的<a class="hyperlink">隱私權條款</a></div>
      </div>
    </div>
    <div class="flex-grow min-h-[2em]"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const verifyType = ref(0);
    // Email Verification
    const sendCodeStatus = ref(false);
    function sendVerifyCode() {
      // submit code
      sendCodeStatus.value = true;
    }
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
    }
    return {
      verifyType,
      sendCodeStatus,
      sendVerifyCode,
      fileElement,
      upload,
      sizeError,
    };
  },
});
</script>
