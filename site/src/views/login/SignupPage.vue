<template>
  <div class="bg-orange-50 h-screen flex flex-col overflow-auto">
    <div class="flex-grow min-h-[1em]"></div>
    <div class="bg-white sm:shadow p-5 w-full h-screen sm:w-2/3 md:w-96 sm:h-fit mx-auto">
      <img src="@/assets/monkey_id.svg" alt="monkey id" class="inline-block w-full m-auto max-h-24 p-0">
      <label class="round-input-label">
        <div class="title">身份</div>
        <select class="select" v-model="data.identity">
          <option value="0">在校學生</option>
          <option value="1">教職員</option>
          <option value="2">畢業校友</option>
        </select>
      </label>
      <label class="round-input-label">
        <div class="title">所屬學校</div>
        <select class="select" v-model="data.univ_id">
          <template v-for="(item, index) in univList" :key="index">
            <option :value="item.univ_id">{{ item.univ_id }} - {{ item.univ_name_ch_full }}</option>
          </template>
        </select>
      </label>
      <label class="round-input-label">
        <div class="title">常用信箱(帳號)</div>
        <div class="text-sm text-gray-400 m-1">不一定要學校信箱，建議使用常用信箱</div>
        <input type="email" class="input" placeholder="abc@xyz.com" v-model="data.account" @blur="checkExists">
        <div class="warning-text" v-if="errorList.account.unique == false && data.account.length > 0">Email已被註冊</div>
        <div class="warning-text" v-if="errorList.account.format == false && data.account.length > 0">Email格式不正確</div>
      </label>
      <label class="round-input-label">
        <div class="title">真實姓名</div>
        <div class="text-sm text-gray-400 m-1">請輸入與身份證明文件相同的名字</div>
        <input type="text" class="input" placeholder="你的名字" v-model="data.name">
      </label>
      <label class="round-input-label">
        <div class="title">密碼</div>
        <input type="password" class="input" placeholder="・・・・・・・・" v-model="data.password">
        <div class="warning-text" v-if="errorList.password.format == false && data.password.length > 0">密碼須包含大寫、小寫字母與數字，並有8個字元以上</div>
      </label>
      <label class="round-input-label">
        <div class="title">確認密碼</div>
        <input type="password" class="input" placeholder="・・・・・・・・" v-model="passwordConfirm">
        <div class="warning-text" v-if="errorList.password.match == false && passwordConfirm.length > 0">兩次密碼不相同</div>
      </label>
      <button class="round-full-button" @click="submitAll">註冊</button>
      <div class="text-sm text-gray-500">當您點下註冊，代表您已同意我們的<a class="hyperlink">隱私權條款</a></div>
      <hr class="my-3">
      <div class="text-lg text-gray-500">已經有帳號了？<router-link to="/login" class="hyperlink">點我登入</router-link>吧！</div>
    </div>
    <div class="flex-grow min-h-[2em]"></div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref, reactive, watch,
} from 'vue';
import type { Ref } from 'vue';
import { useRouter } from 'vue-router';
import VueRequest from '@/vue-request';

export default defineComponent({
  setup() {
    const vr = new VueRequest();
    // university list
    interface IUnivList {
      univ_id: string,
      univ_name_ch_full: string,
      univ_name_ch: string,
      univ_name_en: string
    }
    const univList: Ref<IUnivList[]> = ref([]);
    function getUnivList() {
      vr.Get('univ-list', univList);
    }
    getUnivList();
    // input data
    const data = reactive({
      identity: 0,
      account: '',
      univ_id: 'U0009',
      name: '',
      password: '',
    });
    const passwordConfirm = ref('');
    const errorList = reactive({
      account: {
        filled: false,
        format: false,
        unique: true,
      },
      name: {
        filled: false,
      },
      password: {
        filled: false,
        match: false,
        format: false,
      },
    });
    interface IExistResponse {
      message: boolean;
    }
    function checkExists() {
      if (data.account.length > 0) {
        vr.Get(`auth/user/exist/${data.account}`).then((res: IExistResponse) => {
          errorList.account.unique = !res.message;
        });
      } else {
        errorList.account.unique = true;
      }
    }
    watch(data, () => {
      errorList.account.filled = data.account.length > 0;
      // eslint-disable-next-line
      errorList.account.format = (/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(data.account)) || data.account.length === 0;
      errorList.name.filled = data.name.length > 0;
      errorList.password.filled = data.password.length > 0;
      errorList.password.format = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(data.password) || data.password.length === 0;
      errorList.password.match = data.password === passwordConfirm.value;
    });
    watch(passwordConfirm, () => {
      errorList.password.match = data.password === passwordConfirm.value;
    });
    function submitAll() {
      checkExists();
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
      interface IRegisterResponse {
        status: string;
      }
      vr.Post('auth/user/register', data).then((res: IRegisterResponse) => {
        if (res.status === 'A01') {
          useRouter().push('/login/done');
        }
      });
    }
    return {
      univList,
      data,
      passwordConfirm,
      errorList,
      submitAll,
      checkExists,
    };
  },
});
</script>

<style lang="scss" scoped>
.warning-text {
  @apply text-red-700 text-sm;
}
</style>
