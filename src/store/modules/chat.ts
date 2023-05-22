import { defineStore } from 'pinia'
import chatList  from './chatList.json'

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
    },
    pushCurrentChat(content: any) {
      this.currentChat.chatList.messages.push(content)
    },
    updatedLastMessage(messages: any) {
      this.currentChat.chatList.messages[this.currentChat.chatList.messages.length - 1] = messages
    },
    pushChatList(newChat: any) {
      this.chatList.push(newChat)
    },
    deleteChat(chatId: string) {
      const index = this.chatList.findIndex((item: any) => item.chatId === chatId)
      this.chatList.splice(index, 1)
    }
  },
  persist: true
})

export default useChatStore