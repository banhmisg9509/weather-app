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
      <div
        class="hidden md:flex items-center cursor-pointer justify-self-end max-w-[350px]"
        @click="isShowLocationList = true"
      >
        <v-icon name="co-location-pin"></v-icon>
        <span
          class="md:text-lg lg:text-xl truncate"
          :title="`${locationStore.currentLocation.name}, ${locationStore.currentLocation.country}`"
          >{{ locationStore.currentLocation.name }},
          {{ locationStore.currentLocation.country }}</span
        >
      </div>
      <div class="md:hidden cursor-pointer" @click="isShowMobileMenu = true">
        <v-icon name="gi-hamburger-menu" scale="2"></v-icon>
      </div>
    </section>
    <LocationList v-if="isShowLocationList" @close-modal="isShowLocationList = false" />
    <MobileMenu v-if="isShowMobileMenu" @close-menu="isShowMobileMenu = false" />
  </nav>
</template>

<script setup lang="ts">
import { useLocationStore } from '@/store/locationStore'
import { useDateFormat, useMediaQuery, useNow } from '@vueuse/core'
import SearchBar from '@/components/SearchBar.vue'
import LocationList from '@/components/LocationList.vue'
import MobileMenu from '@/components/MobileMenu.vue'
import { ref, watch } from 'vue'

const date = useDateFormat(useNow(), 'ddd, DD MMM YYYY')
const locationStore = useLocationStore()
const isShowLocationList = ref(false)
const isShowMobileMenu = ref(false)

const isMobile = useMediaQuery('(max-width: 768px)')

watch(isMobile, (newVal) => {
  if (isShowLocationList.value) {
    isShowLocationList.value = false
  }

  // large screen
  if (newVal === false && isShowMobileMenu.value) {
    isShowMobileMenu.value = false
  }
})
</script>
