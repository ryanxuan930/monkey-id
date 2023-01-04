<template>
  <div class="bg-orange-50 h-screen overflow-hidden p-10">
    <div class="bg-white sm:shadow p-5 w-full h-full flex flex-col">
      <div class="text-left">
        <router-link class="text-lg hyperlink" to="/">回上一頁</router-link>
        <hr class="mt-3">
      </div>
      <div class="flex-grow overflow-auto">
        <table class="w-full">
          <tr>
            <th>學校</th>
            <th>姓名</th>
            <th>身份</th>
            <th>狀態</th>
            <th>有效期限</th>
            <th>操作</th>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import type { Ref } from 'vue';
import VueRequest from '@/vue-request';

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const vr = new VueRequest(store.state.token);
    // timer
    setInterval(() => {
      console.log(1);
    }, 1000);
    return {
    };
  },
});
</script>
