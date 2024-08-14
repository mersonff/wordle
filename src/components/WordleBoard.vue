<script setup lang="ts">
defineProps<{
  wordOfTheDay: string
}>()
</script>

<template>
  <input type="text" />
  <p>You have won!</p>
  <p>{{ wordOfTheDay }}</p>
</template>