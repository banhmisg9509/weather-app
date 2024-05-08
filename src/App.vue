<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <main class="min-h-screen bg-gradient-to-br from-sky-400 via-sky-500 to-sky-700 pt-[72px]">
    <NavBar />
    <RouterView />
  </main>
</template>
