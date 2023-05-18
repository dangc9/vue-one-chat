<script setup lang="ts">

</script>

<template>
  <div class="chat-aside">
    <nav class="flex flex-col w-full">
      <div>
        <a class="flex ">
          <svg-icon name="chat" class="h-6 w-6 chat-icon"></svg-icon>
          <span>新对话</span>
        </a>
      </div>
    </nav>
  </div>
</template>

<style lang="less" scoped>
  .chat-aside {
    width: 260px;
    height: 100%;
    flex-shrink: 0;
    // border-right: 1px solid var(--d-border-color);
    --tw-bg-opacity: 1;
    background-color: rgb(31 41 55/var(--tw-bg-opacity));
  }
  .chat-icon {
    color: rgb(209 213 219)
  }
</style>