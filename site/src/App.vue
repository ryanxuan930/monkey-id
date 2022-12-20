<template>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: 'Noto Sans TC', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.round-input-label {
  @apply block text-left text-xl md:text-lg text-gray-700 my-3;
  .title {
    @apply p-1;
  }
  .input, .select {
    @apply block w-full px-4 py-1 rounded-full border-2 appearance-none;
  }
}
.round-full-button {
  @apply block py-2 px-5 bg-orange-500 hover:bg-orange-400 duration-200 text-white w-full my-3 rounded-full text-xl md:text-lg;
}
.hyperlink {
  @apply text-orange-500 hover:text-orange-400 duration-200 cursor-pointer;
}
</style>
