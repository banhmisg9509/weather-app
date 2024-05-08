<template>
  <nav
    class="bg-gradient-to-tr from-sky-400 to-sky-700 text-white shadow-lg fixed top-0 inset-x-0 z-10"
  >
    <section
      class="h-full p-4 lg:container lg:mx-auto flex gap-2 md:gap-1 md:grid sm:grid-cols-1 md:grid-cols-[1fr_2fr_1fr] items-center"
    >
      <div class="hidden md:flex flex-col">
        <span class="md:text-lg lg:text-xl">{{ date }}</span>
      </div>
      <div class="w-full">
        <SearchBar />
      </div>
      <div class="hidden md:block justify-self-end">
        <div class="flex items-center">
          <v-icon name="co-location-pin"></v-icon>
          <span class="md:text-lg lg:text-xl"
            >{{ locationStore.currentLocation.name }},
            {{ locationStore.currentLocation.country }}</span
          >
        </div>
      </div>
      <div class="md:hidden">
        <v-icon name="gi-hamburger-menu" scale="2"></v-icon>
      </div>
    </section>
  </nav>
</template>

<script setup lang="ts">
import { useLocationStore } from '@/store/locationStore'
import { useDateFormat, useNow } from '@vueuse/core'
import SearchBar from '@/components/SearchBar.vue'

const date = useDateFormat(useNow(), 'ddd, DD MMM YYYY')
const locationStore = useLocationStore()
</script>
