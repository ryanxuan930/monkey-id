<template>
  <div class="bg-orange-50 h-screen flex flex-col overflow-auto">
    <div class="flex-grow min-h-[1em]"></div>
    <div class="bg-white sm:shadow p-5 w-full h-screen sm:w-2/3 md:w-96 sm:h-fit mx-auto">
      <img src="@/assets/monkey_id.svg" alt="monkey id" class="inline-block w-full m-auto max-h-24 p-0">
      <label class="round-input-label">
        <div class="title">身份</div>
        <select class="select">
          <option value="0">在校學生</option>
          <option value="1">教職員</option>
          <option value="2">畢業校友</option>
        </select>
      </label>
      <label class="round-input-label">
        <div class="title">所屬學校</div>
        <select class="select">
          <option value="U0009">國立中山大學</option>
          <option value="U0001">國立政治大學</option>
        </select>
      </label>
      <label class="round-input-label">
        <div class="title">常用信箱(帳號)</div>
        <div class="text-sm text-gray-400 m-1">不一定要學校信箱，建議使用常用信箱</div>
        <input type="email" class="input" placeholder="abc@xyz.com">
      </label>
      <label class="round-input-label">
        <div class="title">真實姓名</div>
        <div class="text-sm text-gray-400 m-1">請輸入與身份證明文件相同的名字</div>
        <input type="text" class="input" placeholder="你的名字">
      </label>
      <label class="round-input-label">
        <div class="title">密碼</div>
        <input type="password" class="input" placeholder="・・・・・・・・">
      </label>
      <label class="round-input-label">
        <div class="title">確認密碼</div>
        <input type="password" class="input" placeholder="・・・・・・・・">
      </label>
      <button class="round-full-button">註冊</button>
      <div class="text-sm text-gray-500">當您點下註冊，代表您已同意我們的<a class="hyperlink">隱私權條款</a></div>
      <hr class="my-3">
      <div class="text-lg text-gray-500">已經有帳號了？<router-link to="/login" class="hyperlink">點我登入</router-link>吧！</div>
    </div>
    <div class="flex-grow min-h-[2em]"></div>
  </div>
</template>
