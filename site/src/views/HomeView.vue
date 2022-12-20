<template>
  <div class="bg-orange-50 h-screen flex flex-col overflow-auto">
    <div class="flex-grow min-h-[1em]"></div>
    <div class="bg-white sm:shadow p-5 w-full h-screen sm:w-2/3 md:w-96 sm:h-fit mx-auto text-gray-600 text-left">
      <div class="text-4xl font-medium mb-1">測試者</div>
      <div class="text-lg text-gray-500">國立中山大學</div>
      <div class="text-lg text-gray-500">在校學生</div>
      <div class="p-3 border-2 border-gray-300 rounded-xl my-5">
        <div class="text-2xl font-medium text-green-700">身份有效</div>
        <div class="text-lg text-gray-500">有效期限：2023/01/01</div>
        <button class="round-full-button" @click="$router.push('verify')">重新驗證</button>
      </div>
      <button class="round-full-button">登出</button>
    </div>
    <div class="flex-grow min-h-[1em]"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import VueRequest from '@/vue-request';

export default defineComponent({
  setup(props) {
    const vr = new VueRequest();
    console.log(vr);
    const data = ref();
    vr.Get('bulletin/list', data);
    return {
      data,
    };
  },
});
</script>
