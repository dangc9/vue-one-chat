<script setup lang="ts">
  import { ref, onMounted, nextTick } from 'vue'
  import MessageItem from "./MessageItem.vue"
  import { toRefs } from "vue"
  import useChatStore from "@/store/modules/chat"
  import '@/assets/style/clipboard.css'
  import '@/assets/style/message.css'
  import { autoTextarea } from '@/hooks'
  import { generateUUID } from '@/utils/index.ts'
  import { useRouter } from 'vue-router'
  const router = useRouter()

  const chatStore = useChatStore()
  const { currentChat } = toRefs(chatStore)
  let messageContent = ref("");
  const scrollContainer  = ref()
  const currentMessage = ref({
    role: "assistant",
    content: ""
  })
  let isLoading = ref(false);
  onMounted(() => {
    const textarea = document.querySelector('#prompt-textarea') as HTMLTextAreaElement;
    autoTextarea(textarea)
  })
  const scrollToBottom = () => {
    nextTick(() => {
      scrollContainer.value.scrollTo({
        top: scrollContainer.value.scrollHeight,
        behavior: "smooth"
      })
    })
  }
  // 发送问题，请求gpt
  async function sendQuestion(value?: string) {
    const content = value ?? messageContent.value
    if(!content) return
    pushQuestion(content)
    try {
      scrollToBottom()
      await fetchGPT()
      isLoading.value = false
      chatStore.pushCurrentChat(JSON.parse(JSON.stringify(currentMessage.value)))
      currentMessage.value.content = ""
    } catch (error: any) {
      console.log(error.message)
    }
  }
  async function fetchGPT() {
    isLoading.value = true
    const response = await fetch("http://129.226.176.183:8088/api", {
      method: "POST",
      body: JSON.stringify({
        messages: currentChat.value.chatList.messages,
        temperature: 0.6,
        password: import.meta.env.VITE_PASSWORD,
        model: currentChat.value.chatList.model
      }),
    })
    if (!response.ok) {
      const res = await response.json()
      throw new Error(res.error.message)
    }
    const data = response.body
    if (!data) {
      throw new Error("没有返回数据")
    }
    const reader = data.getReader()
    const decoder = new TextDecoder("utf-8")
    let done = false
    while (!done) {
      const { value, done: readerDone } = await reader.read()
      if (value) {
        const char = decoder.decode(value)
        if (char === "\n") {
          continue
        }
        if (char) {
          currentMessage.value.content = currentMessage.value.content + char
        }
      }
      done = readerDone
    }
  }
  function pushQuestion(content: string) {
    const message = { role: "user",  content}
    const ChatId = currentChat.value.chatId
    if(ChatId) {
      chatStore.pushCurrentChat(message)
    }else {
      const title = content.slice(0, 20)
      const chatId = generateUUID()
      const newChat = {
        chatId,
        title,
        chatList: {
          model: "gpt-3.5-turbo",
          messages: [{
            role: "user",
            content
          }]
        }
      }
      chatStore.pushChatList(newChat)
      chatStore.setCurrentChat(newChat)
      router.push({ name: 'chat', params: { chatId } })
    }
    messageContent.value = ""
  }
</script>

<template>
  <div ref="scrollContainer" class="scroll-container relative flex grow overflow-y-auto ">
    <div class="message-content">
      <div class="transition-all pt-6 pb-24">
        <template v-for="item in currentChat.chatList.messages">
          <MessageItem :item="item" />
        </template>
        <MessageItem v-if="isLoading" :item="currentMessage"/>
      </div>
      <div class="action fixed flex z-30 bottom-0 bg-white pb-4 mx-auto">
        <div class="flex flex-col py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)]">
          <textarea  
            v-model="messageContent"
            id="prompt-textarea"  
            placeholder="Send a message."  
            class="prompt-textarea"
            v-on:focus="scrollToBottom()"
            @keydown.enter.exact="sendQuestion()"></textarea>
          <button class="absolute p-1 rounded-md text-gray-500 bottom-3 hover:bg-gray-100 right-2 md:right-2 disabled:opacity-40" @click="sendQuestion()">
            <svg-icon name="send" class="w-4 h-4"/>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  @tailwind components;
  @layer components {
    .prompt-textarea {
      height: 24px; 
      line-height: 24px; 
      max-height: 144px;  
      outline: none;
      @apply m-0 w-full resize-none border-0 bg-transparent p-0 pr-7 focus:ring-0 focus-visible:ring-0;
    }
    .action {
      width: 54rem;
      background-clip: border-box;
      border-top: 20px solid transparent;
      border-image: linear-gradient(to bottom, #000, #fff) 1 100%;
    }
    .message-content {
      width: 54rem;
      margin: 0 auto;
    }
  }
</style>
