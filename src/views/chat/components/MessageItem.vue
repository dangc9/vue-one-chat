<script setup lang="ts">
  import { onMounted, onUnmounted } from 'vue'
  import Loading from "@/components/loading/index.vue"
  import md  from "@/libs/markdown-it";
  import userHead from "@/assets/img/user.png"
  import robot from "@/assets/img/robot.svg"
  import { useCopyCode } from '@/hooks'
  const listerner = useCopyCode()
  defineProps<{
    item: { role: string,  content: string }
  }>()
  onMounted(() => {
    window.addEventListener("click", listerner)
  })
  onUnmounted(() => {
    window.removeEventListener("click", listerner)
  })
  function getHead(item: string) {
    return item === 'user' ? userHead : robot
  }
</script>

<template>
  <div class="flex px-10 py-4 hover:bg-gray-50 rounded-md mb-2">
    <img :src="getHead(item.role)" class="w-9 h-9 rounded-md bg-gradient-to-r from-yellow-300 to-red-700 " alt=""/>
    <div class="px-4 py-1.5  text-gray-800 text-left max-w-full"> 
      <div v-if="item.content" class="prose max-w-3xl prose-slate text-sm dark:prose-invert dark:text-slate break-words overflow-hidden" v-html="md.render(item.content)"></div>
      <Loading v-else/>
    </div>
  </div>
</template>