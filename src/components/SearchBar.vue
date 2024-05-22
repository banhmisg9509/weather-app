<template>
  <div class="relative">
    <div class="relative">
      <input
        v-model="searchTerm"
        type="text"
        class="w-full bg-sky-700 px-10 h-10 border rounded-full placeholder:text-white focus:outline-none focus:ring-1 focus:ring-white"
        placeholder="Search for location..."
      />
      <v-icon name="bi-search" class="absolute top-1/2 -translate-y-1/2 left-4"></v-icon>
      <v-icon
        @click="searchTerm = ''"
        v-if="searchTerm"
        name="md-clear-outlined"
        class="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
      ></v-icon>
    </div>
    <ul v-if="data" class="absolute top-11 w-full flex flex-col bg-sky-700 rounded-lg">
      <li
        v-for="location in data"
        :key="location.id"
        class="p-4 first:rounded-t-lg last:rounded-b-lg hover:bg-sky-800 cursor-pointer"
        @click="() => onSelectLocation(location)"
      >
        <v-icon name="co-location-pin"></v-icon>
        <span>{{ location.name }}, </span>
        <span v-if="location.region">{{ location.region }}, </span>
        <span>{{ location.country }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useGetLocation } from '@/composables/useGetLocation'
import { useLocationStore } from '@/store/locationStore'
import type { SearchLocation } from '@/types'
import { refDebounced } from '@vueuse/core'
import { toRaw, ref } from 'vue'

const searchTerm = ref('')
const searchTermDebounced = refDebounced(searchTerm, 500)

const { data } = useGetLocation(searchTermDebounced)
const { setLocation, addSelectedLocation } = useLocationStore()

const shortCountryName = (location: SearchLocation, countries: Record<string, string>) => {
  location = toRaw(location)
  if (countries[location.country]) {
    location.country = countries[location.country]
  }
  return location
}

const onSelectLocation = (location: SearchLocation) => {
  location = shortCountryName(location, { 'United States of America': 'USA' })
  setLocation(location)
  addSelectedLocation(location)
  searchTerm.value = ''
}
</script>
