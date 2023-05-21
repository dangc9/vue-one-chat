<script setup lang="ts">
  // import { ChatMessage } from "@/types"
  import { onMounted, onUnmounted } from 'vue'
  import userHead from "@/assets/img/user.png"
  import robot from "@/assets/img/robot.svg"
  import { toRefs } from "vue"
  import useChatStore from "@/store/modules/chat"
  import '@/assets/style/clipboard.css'
  import md  from "@/libs/markdown-it";
  import { useCopyCode } from '@/hooks'
  const listerner = useCopyCode()
  const { currentChat } = toRefs(useChatStore())

  const messageContent = (val: any) => {
    const content = md.render(val)
    console.log(content)
    return content
  }



  onMounted(() => {
    window.addEventListener("click", listerner)
    const textarea = document.querySelector('#prompt-textarea') as HTMLTextAreaElement;
    textarea.addEventListener('input', changeHeight);
    textarea.addEventListener('keydown', function(event) {
      if (event.keyCode === 13) { // Enter键
        event.preventDefault();
        if (event.shiftKey) { // 同时按下Shift键
          var cursorPos = this.selectionStart;
          var textBefore = this.value.substring(0, cursorPos);
          var textAfter = this.value.substring(cursorPos, this.value.length);
          this.value = textBefore + "\n" + textAfter;
          this.selectionEnd = cursorPos + 1;
          changeHeight()
        }
      }
    });
    function changeHeight() {
      let scrollHeight = textarea.scrollHeight;
      if(scrollHeight !== 24) {
        textarea.style.height = 'auto';
        scrollHeight = textarea.scrollHeight;
      }
      textarea.style.height = scrollHeight  + 'px';
    }
  })
  // 卸载监听
  onUnmounted(() => {
    window.removeEventListener("click", listerner)
  })
  function getHead(item: string) {
    return item === 'user' ? userHead : robot
  }
</script>

<template>
  <div class="transition-all h-full max-w-3xl mx-auto">
    <div class="message-container pb-5">
      <template v-for="item in currentChat.chatList.messages">
        <div class="flex px-10 py-4 hover:bg-gray-50 rounded-md mb-2 message-item">
          <img :src="getHead(item.role)" class="w-9 h-9 rounded-md bg-gradient-to-r from-yellow-300 to-red-700 " alt=""/>
          <div class="px-4 py-1.5 text-sm text-gray-800 text-left max-w-full"> 
            <div class="message prose prose-slate dark:prose-invert dark:text-slate break-words overflow-hidden" v-html="messageContent(item.content)"></div>
          </div>
        </div>
      </template>
    </div>
    <div class="sticky z-30 bottom-0 bg-white pb-4">
      <div class="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)]">
        <textarea  id="prompt-textarea"  placeholder="Send a message."  class="prompt-textarea"></textarea>
        <button class="absolute p-1 rounded-md text-gray-500 bottom-1.5 hover:bg-gray-100 right-1 md:right-2 disabled:opacity-40">
          <svg-icon name="send" class="w-4 h-4"/>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  @tailwind components;
  @layer components {
    .prompt-textarea {
      height: 24px; 
      line-height: 24px; 
      max-height: 144px;  
      outline: none;
      @apply m-0 w-full resize-none border-0 bg-transparent p-0 pr-7 focus:ring-0 focus-visible:ring-0;
    }
  }
  // ::deep(::-webkit-scrollbar) {
  //   width: 6px;
  //   height: 6px;
  // }
</style>
