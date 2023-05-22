<script setup lang="ts">
  import { toRefs, watch  } from "vue"
  import { useRoute } from 'vue-router'
  import useChatStore from "@/store/modules/chat"
  import ChatAside from "./components/ChatAside.vue"
  import Chat from "./components/Chat.vue"
  import { defaultMessage } from '@/system'
  const chatStore = useChatStore()
  const { chatList, currentChat } = toRefs(chatStore)
  const route = useRoute()
  watch(() => route.params.chatId, (chatId) => {
    if(chatId) {
      if(currentChat.value.chatId === chatId) return
      const chat = chatList.value.find((item) => item.chatId === chatId)
      chatStore.setCurrentChat(chat ? chat : defaultMessage)
    }else {
      chatStore.setCurrentChat(defaultMessage)
    }
  }, { immediate: true })
</script>

<template>
  <div class="chat-container">
    <ChatAside/>
    <div class="relative flex flex-1">
      <div class="h-full w-full flex flex-col">
        <div class="flex flex-1 py-4 px-4 shadow-md z-50 bg-white max-h-14">
          <div class="flex items-center justify-center cursor-pointer">
            <svg-icon name="flod" class="h-6 w-6"></svg-icon>
          </div>
          <div class="center w-full">{{ currentChat.title || 'Ai智能聊天助手' }}</div>
        </div>
        <Chat/>
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