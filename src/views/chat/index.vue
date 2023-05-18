<script setup lang="ts">
  import { ref } from "vue"
  import ChatAside from "./components/ChatAside.vue"
  const count = ref(0)
  console.log(count)
</script>

<template>
  <div class="chat-container">
    <ChatAside/>
    <div>
      内容
    </div>
  </div>
</template>

<style lang="less" scoped>
  .chat-container {
    display: flex;
    width: 100%;
    height: 100%;
  }
</style>