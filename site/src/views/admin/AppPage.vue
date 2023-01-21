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
            <div>App名稱</div>
            <input type="text" v-model="filterData.app_name">
          </label>
          <label class="filter-input">
            <div>網域</div>
            <input type="text" v-model="filterData.domain">
          </label>
          <div>更新時間：{{ updateTime }}</div>
        </div>
        <hr class="my-3">
      </div>
      <div class="flex-grow overflow-auto">
        <table class="w-full">
          <tr>
            <th>名稱</th>
            <th>網域</th>
            <th>App Key</th>
            <th>
              <router-link to="/admin/app/add">新增</router-link>
            </th>
          </tr>
          <template v-for="(item, index) in appList" :key="index">
            <tr v-if="filterFunction(item)">
              <td>{{ item.app_name }}</td>
              <td>{{ item.domain }}</td>
              <td>{{ item.app_key }}</td>
              <td>
                <router-link class="text-orange-500" :to="`/admin/app/${item.id}`">查看</router-link>
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
    interface IAppList {
      id: number,
      app_name: string,
      domain: string,
      app_key: string
    }
    const appList: Ref<IAppList[]> = ref([]);
    function getAppList() {
      vr.Get('admin/app', appList, true, true);
    }
    getAppList();
    // filter
    type TFilterData = {
      [key: string]: string
    }
    const filterData: TFilterData = reactive({
      appName: '',
      domain: '',
    });
    // timer
    const dateObj = new Date();
    const updateTime: Ref<string> = ref(dateObj.toLocaleString('zh-TW', {
      hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short',
    }));
    setInterval(() => {
      getAppList();
      updateTime.value = dateObj.toLocaleString('zh-TW', {
        hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short',
      });
    }, 60000);
    return {
      appList,
      filterData,
      filterFunction: (data: IAppList) => {
        let flag = true;
        if (data.app_name !== filterData.appName && filterData.appName.length > 0) {
          flag = false;
        }
        if (data.domain !== filterData.domain && filterData.domain.length > 0) {
          flag = false;
        }
        return flag;
      },
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
