<script setup lang="ts">
  import { ref } from "vue"
  
  import { ChatMessage } from "@/types"
  import ChatAside from "./components/ChatAside.vue"
  import Chat from "./components/Chat.vue"
  const d_chatList = localStorage.getItem('d_chatList')
  const chatList = ref<ChatMessage[]>(d_chatList ? JSON.parse(d_chatList) : [])
  // localStorage.setItem('d_chatList', JSON.stringify(chatList.value))
  const currentChat = ref<ChatMessage>(chatList.value[0])

</script>

<template>
  <div class="chat-container">
    <ChatAside/>
    <div class="relative flex flex-1">
      <div class="h-full w-full flex flex-col">
        <div class="flex flex-1 py-4 px-4 shadow-md z-50 bg-white">
          <div class="flex items-center justify-center cursor-pointer">
            <svg-icon name="flod" class="h-6 w-6"></svg-icon>
          </div>
          <div class="center w-full">{{ currentChat.title || 'Ai智能聊天助手' }}</div>
        </div>
        <div class="relative flex grow overflow-y-auto">
          <Chat :currentChat="currentChat"/>
        </div>
      </div>
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