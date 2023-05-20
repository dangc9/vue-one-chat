import { defineStore } from 'pinia'
import chatList  from './chatList.json'
// import { ChatMessage } from "@/types"
const useChatStore = defineStore('chat', {
  state: () => ({ 
    count: 0,
    chatList: chatList,
    currentChat: chatList[0],
  }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
    setCurrentChat(chat: any) {
      this.currentChat = chat
    }
  },
  // persist: true
})

export default useChatStore