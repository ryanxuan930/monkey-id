<template>
  <div class="bg-orange-50 h-screen overflow-hidden p-10">
    <div class="bg-white sm:shadow p-5 w-full h-full flex flex-col">
      <div class="text-left">
        <router-link class="text-lg hyperlink" to="/admin/app">回上一頁</router-link>
        <hr class="mt-3">
      </div>
      <div class="flex-grow overflow-auto py-3 text-left">
        <label class="data-input">
          <div>App名稱：</div>
          <input type="text" v-model="data.app_name">
        </label>
        <label class="data-input">
          <div>網域：</div>
          <input type="text" v-model="data.domain">
        </label>
        <button class="full-button" @click="submitAll">新增</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import VueRequest from '@/vue-request';

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const vr = new VueRequest(store.state.token);
    const data = reactive({
      app_name: '',
      domain: '',
    });
    // edit
    interface IEditResponse {
      status: string,
      field?: string,
      message?: string,
    }
    function submitAll() {
      vr.Post('admin/app', data, null, true, true).then((res: IEditResponse) => {
        if (res.status === 'A01') {
          alert('已新增');
        }
      });
    }
    return {
      data,
      submitAll,
    };
  },
});
</script>

<style lang="scss" scoped>
.data-input {
@apply items-center py-2 text-left;
input, select {
  @apply py-1 px-2 border-2 rounded w-full;
}
input[disabled], select[disabled] {
  @apply cursor-not-allowed;
}
}
</style>
