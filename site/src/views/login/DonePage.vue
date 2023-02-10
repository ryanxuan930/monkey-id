<template>
  <div class="bg-orange-50 h-screen flex flex-col overflow-auto">
    <div class="flex-grow min-h-[1em]"></div>
    <div class="bg-white sm:shadow p-5 w-full h-screen sm:w-2/3 md:w-96 sm:h-fit mx-auto">
      <img src="@/assets/monkey_id.svg" alt="monkey id" class="inline-block w-full m-auto max-h-24 p-0">
      <div class="text-lg text-gray-500">完成註冊囉！快<router-link to="/login" class="hyperlink">點我登入</router-link>吧！</div>
    </div>
    <div class="flex-grow min-h-[2em]"></div>
  </div>
</template>
