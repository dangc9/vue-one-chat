<script setup lang="ts">
  import { toRefs } from "vue"
  import { useRouter } from 'vue-router'
  import useChatStore from "@/store/modules/chat"
  const chatStore = useChatStore()
  const { chatList, currentChat } = toRefs(chatStore)
  const router = useRouter()
  const navClick = (chatId: string) => {
    pushChat(chatId)
  }
  const deleteChat = (chatId: string) => {
    pushChat(undefined)
    chatStore.deleteChat(chatId)
    
  }
  function pushChat(chatId: string | undefined)  {
    router.push({ name: 'chat', params: { chatId } })
  }
</script>

<template>
  <div class="chat-aside">
    <nav class="flex flex-col w-full h-full">
      <div @click="pushChat(undefined)" class="flex text-white py-2 px-3 mx-3 my-2 border-md items-center rounded-md bg-gray-600 justify-center cursor-pointer hover:bg-gray-500 transition-all">
        <svg-icon name="chat" class="h-6 w-6 text-gray-200"></svg-icon>
        <span class="pl-2 pr-6">新建对话</span>
      </div>
      <hr class="border-gray-700">
      <div class="chat-list flex-1 mt-4">
        <template v-for="item in chatList">
          <div class="flex text-white font-medium text-sm px-3 py-3 cursor-pointer" :class="{'active': item.chatId === currentChat.chatId }" @click="navClick(item.chatId)">
            <div class="flex items-center">
              <svg-icon name="chat" class="h-4 w-4 text-gray-200 mr-3"></svg-icon>
            </div>
            <div class="flex-1 text-left truncate">{{ item.title }}</div>
            <div class="flex items-center" v-if="item.chatId === currentChat.chatId">
              <!-- <svg-icon name="edit" class="h-4 w-4 text-gray-500 hover:text-white"></svg-icon> -->
              <svg-icon 
                name="delete" 
                class="ml-2 h-4 w-4 text-gray-500 hover:text-white"
                @click="deleteChat(item.chatId)">
              </svg-icon>
            </div>
          </div> 
        </template>       
      </div>
      <div>
      </div>
    </nav>
  </div>
</template>

<style lang="less" scoped>
  @tailwind components;
  @layer components {
    .chat-aside  {
      width: 260px;
      @apply flex-shrink-0 h-full bg-gray-800;
    }
    .active {
      @apply bg-gray-900;
    }
  }
</style>