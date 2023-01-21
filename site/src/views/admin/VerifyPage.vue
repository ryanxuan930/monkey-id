<template>
    <div class="bg-orange-50 h-screen overflow-hidden p-10">
      <div class="bg-white sm:shadow p-5 w-full h-full flex flex-col">
        <div class="text-left">
          <router-link class="text-lg hyperlink" to="/admin/user">回上一頁</router-link>
          <hr class="mt-3">
        </div>
        <div class="flex-grow overflow-auto py-3 text-left md:grid grid-cols-2 gap-5">
          <div>
            <!--input-->
            <div class="text-2xl">基本資料</div>
            <hr class="my-3">
            <label class="data-input">
              <div>姓名：</div>
              <input type="text" v-model="userData.name" :disabled="!edit">
            </label>
            <label class="data-input">
              <div>帳號：</div>
              <input type="text" v-model="userData.account" :disabled="!edit">
            </label>
            <label class="data-input">
                <div>學校：</div>
                <select v-model="userData.univ_id" :disabled="!edit">
                  <template v-for="(item, index) in univList" :key="index">
                    <option :value="item.univ_id">{{ item.univ_name_ch_full }}</option>
                  </template>
                </select>
              </label>
            <div class="md:grid grid-cols-2 gap-2">
              <label class="data-input">
                <div>身份：</div>
                <select v-model="userData.identity" :disabled="!edit">
                  <option value="0">在校學生</option>
                  <option value="1">畢業生</option>
                  <option value="2">校友</option>
                </select>
              </label>
              <label class="data-input">
                <div>方式：</div>
                <select v-model="userData.verify_type" :disabled="!edit">
                  <option value="0">學校Email信箱驗證</option>
                  <option value="1">上傳證明文件</option>
                </select>
              </label>
            </div>
            <label class="data-input">
              <div>狀態：</div>
              <select v-model="status" :disabled="!edit">
                <option value="9">審核通過</option>
                <option value="4">資料無法辨識</option>
                <option value="5">資料不符</option>
                <option value="6">資料已過期</option>
                <option value="7">請聯繫管理員</option>
                <option value="8">請重新驗證</option>
                <option disabled value="1">已發送驗證信</option>
                <option disabled value="2">驗證失敗</option>
                <option disabled value="3">人工審核中</option>
              </select>
            </label>
            <label class="data-input">
              <div>有效：</div>
              <input type="datetime-local" v-model="userData.valid_until" :disabled="!edit">
            </label>
            <label class="data-input">
              <div>備註：</div>
              <input type="text" v-model="userData.remarks" :disabled="!edit">
            </label>
            <!--button-->
            <button class="full-button" v-if="edit === false" @click="edit = !edit">編輯</button>
            <div v-if="edit" class="grid grid-cols-2 gap-5">
              <button class="full-button" @click="submitAll">儲存</button>
              <button class="full-button bg-red-600 hover:bg-red-500" @click="() => {getUserData(); edit = false;}">取消</button>
            </div>
          </div>
          <div>
            <div class="text-2xl">驗證資料</div>
            <hr class="my-3">
            <div v-if="userData.file !== ''">
              <img class="w-full" :src="`https://sports.nsysu.edu.tw/monkeyserver/storage/${userData.file}`" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import type { Ref } from 'vue';
import VueRequest from '@/vue-request';

export default defineComponent({
  setup() {
    const store = useStore();
    const route = useRoute();
    const vr = new VueRequest(store.state.token);
    const status = ref(9);
    // user data
    interface IUserResponse {
      identity: number,
      verification: number,
      [key: string]: string|number|null,
    }
    const userData: Ref<IUserResponse> = ref({
      identity: 0,
      verification: 0,
      file: '',
    });
    function getUserData() {
      vr.Get(`admin/user/${route.params.id}`, userData, true, true);
    }
    getUserData();
    // univ list
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
    const edit = ref(false);
    // edit
    interface IEditResponse {
      status: string,
      field?: string,
    }
    function submitAll() {
      const temp = {
        u_id: userData.value.u_id,
        account: userData.value.account,
        name: userData.value.name,
        identity: userData.value.identity,
        univ_id: userData.value.univ_id,
        verify_type: userData.value.verify_type,
        remarks: userData.value.remarks,
        valid_until: userData.value.valid_until,
        verification: status.value,
      };
      vr.Patch('admin/user/edit', temp, null, true, true).then((res: IEditResponse) => {
        if (res.status === 'A01') {
          edit.value = false;
        }
      });
    }
    return {
      userData,
      univList,
      getUserData,
      identityList: ['在校學生', '教職員', '畢業校友'],
      statusList: ['尚未驗證', '已發送驗證信', '驗證失敗', '人工審核中', '資料無法辨識', '資料不符', '資料已過期', '請聯繫管理員', '請重新驗證', '審核通過'],
      status,
      edit,
      submitAll,
    };
  },
});
</script>

<style lang="scss" scoped>
.data-input {
  @apply flex items-center py-2 text-left;
  input, select {
    @apply py-1 px-2 border-2 rounded flex-grow;
  }
  input[disabled], select[disabled] {
    @apply cursor-not-allowed;
  }
}
</style>
