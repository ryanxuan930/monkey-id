<template>
  <div class="bg-orange-50 h-screen flex flex-col overflow-auto">
    <div class="flex-grow"></div>
    <div class="bg-white sm:shadow p-5 w-full h-screen sm:w-2/3 md:w-96 sm:h-fit mx-auto">
      <img src="@/assets/monkey_id.svg" alt="monkey id" class="inline-block w-full m-auto max-h-24 p-0" >
      <label class="round-input-label">
        <div class="title">帳號</div>
        <input type="email" class="input" placeholder="abc@xyz.com">
      </label>
      <label class="round-input-label">
        <div class="title">密碼</div>
        <input type="password" class="input" placeholder="・・・・・・・・">
      </label>
      <div class="flex px-3 text-base">
        <div class="basis-1/2 text-left">
          <label class="flex gap-2 items-center">
            <input type="checkbox" class="block">
            <div>記住我</div>
          </label>
        </div>
        <div class="basis-1/2 text-right">
          <a class="hyperlink">忘記密碼</a>
        </div>
      </div>
      <button class="round-full-button">登入</button>
      <hr class="my-3">
      <div class="text-lg text-gray-500">還沒有帳號？那就<router-link to="login/signup" class="hyperlink">註冊一個</router-link>吧！</div>
    </div>
    <div class="flex-grow"></div>
  </div>
</template>
