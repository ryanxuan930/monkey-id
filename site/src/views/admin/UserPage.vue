<template>
  <div class="bg-orange-50 h-screen overflow-hidden p-10">
    <div class="bg-white sm:shadow p-5 w-full h-full flex flex-col">
      <div class="text-left">
        <router-link class="text-lg hyperlink" to="/admin">回上一頁</router-link>
      </div>
      <div>
        <hr class="my-3">
        <div class="flex gap-3 flex-wrap">
          <label class="filter-input">
            <div>學校</div>
            <select v-model="filterData.univId">
              <option value="null">全選</option>
              <template v-for="(item, index) in univList" :key="index">
                <option :value="item.univ_id">{{ item.univ_name_ch_full }}</option>
              </template>
            </select>
          </label>
          <label class="filter-input">
            <div>姓名</div>
            <input type="text" v-model="filterData.name">
          </label>
          <label class="filter-input">
            <div>身份</div>
            <select v-model="filterData.identity">
              <option value="null">全選</option>
              <option value="0">在校學生</option>
              <option value="1">畢業生</option>
              <option value="2">校友</option>
            </select>
          </label>
          <label class="filter-input">
            <div>狀態</div>
            <select v-model="filterData.status">
              <option value="null">全選</option>
              <option value="0">尚未驗證</option>
              <option value="1">已發送驗證信</option>
              <option value="2">驗證失敗</option>
              <option value="3">人工審核中</option>
              <option value="4">資料無法辨識</option>
              <option value="5">資料不符</option>
              <option value="6">資料已過期</option>
              <option value="7">請聯繫管理員</option>
              <option value="8">請重新驗證</option>
              <option value="9">審核通過</option>
            </select>
          </label>
          <div>更新時間：{{ updateTime }}</div>
        </div>
        <hr class="my-3">
      </div>
      <div class="flex-grow overflow-auto">
        <table class="w-full">
          <tr>
            <th>學校</th>
            <th>姓名</th>
            <th>身份</th>
            <th>狀態</th>
            <th>操作</th>
          </tr>
          <template v-for="(item, index) in userList" :key="index">
            <tr v-if="filterFunction(item)">
              <td>{{ item.univ_name_ch_full }}</td>
              <td>{{ item.name }}</td>
              <td>{{ identityList[item.identity] }}</td>
              <td>{{ statusList[item.verification] }}</td>
              <td>
                <router-link class="text-orange-500" :to="`/admin/user/${item.u_id}`">查看</router-link>
              </td>
            </tr>
          </template>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import type { Ref } from 'vue';
import VueRequest from '@/vue-request';

export default defineComponent({
  setup() {
    const store = useStore();
    const vr = new VueRequest(store.state.token);
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
    // user list
    interface IUserResponse {
      identity: number,
      verification: number,
      [key: string]: string|number|null,
    }
    const userList: Ref<IUserResponse[]> = ref([]);
    function getUserList() {
      vr.Get('admin/user', userList, true, true);
    }
    getUserList();
    // filter
    type TFilterData = {
      [key: string]: string
    }
    const filterData: TFilterData = reactive({
      univId: 'null',
      name: '',
      identity: 'null',
      status: 'null',
    });
    // timer
    const dateObj = new Date();
    const updateTime: Ref<string> = ref(dateObj.toLocaleString('zh-TW', {
      hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short',
    }));
    setInterval(() => {
      getUserList();
      updateTime.value = dateObj.toLocaleString('zh-TW', {
        hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short',
      });
    }, 60000);
    return {
      userList,
      univList,
      identityList: ['在校學生', '教職員', '畢業校友'],
      statusList: ['尚未驗證', '已發送驗證信', '驗證失敗', '人工審核中', '資料無法辨識', '資料不符', '資料已過期', '請聯繫管理員', '請重新驗證', '審核通過'],
      filterData,
      filterFunction: (data: IUserResponse) => {
        let flag = true;
        if (data.univ_id !== filterData.univId && filterData.univId !== 'null') {
          flag = false;
        }
        if (data.name !== filterData.name && filterData.name.length > 0) {
          flag = false;
        }
        if (data.identity !== Number(filterData.identity) && filterData.identity !== 'null') {
          flag = false;
        }
        if (data.verification !== Number(filterData.status) && filterData.status !== 'null') {
          flag = false;
        }
        return flag;
      },
      getUserList,
      updateTime,
    };
  },
});
</script>

<style lang="scss" scoped>
.filter-input {
  @apply flex items-center gap-2;
  input, select {
    @apply px-1 py-0.5 border-2 rounded;
  }
}
</style>
