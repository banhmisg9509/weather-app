<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import AppFooter from './components/AppFooter.vue'
import { SpeedInsights } from '@vercel/speed-insights/vue'
</script>

<template>
  <main
    class="min-h-screen bg-gradient-to-br from-sky-400 via-sky-500 to-sky-700 py-[72px] relative"
  >
    <NavBar />
    <RouterView />
    <AppFooter />
    <SpeedInsights />
  </main>
</template>
