<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <main
    class="min-h-screen bg-gradient-to-br from-sky-400 via-sky-500 to-sky-700 pt-[72px] flex flex-col"
  >
    <NavBar />
    <RouterView />
    <AppFooter />
  </main>
</template>
