<template>
  <svg aria-hidden="true">
    <use :href="`#icon-${name}`"/>
  </svg>
</template>

<script setup lang="ts">
  defineProps<{
    name: { type: String, required: true },
  }>()
</script>
