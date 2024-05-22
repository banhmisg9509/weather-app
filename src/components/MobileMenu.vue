<template>
  <section class="fixed inset-0 bg-sky-500">
    <div class="w-full flex justify-between items-center bg-sky-700 p-4">
      <div class="h-10 flex items-center">
        <span class="text-lg">{{ date }}</span>
      </div>
      <div class="cursor-pointer" @click="emits('close-menu')">
        <v-icon name="md-clear-outlined" scale="2"></v-icon>
      </div>
    </div>
    <div>
      <div class="min-h-[350px] rounded-lg p-6">
        <p>Current Location</p>
        <div>
          <div class="flex justify-between bg-sky-400 rounded-lg p-4">
            <p>
              <v-icon name="co-location-pin"></v-icon>
              <span
                >{{ locationStore.currentLocation.name }},
                {{ locationStore.currentLocation.country }}</span
              >
            </p>
          </div>
        </div>
        <p class="mt-2">Selected Locations</p>
        <div class="flex flex-col gap-2 max-h-[350px] overflow-y-auto">
          <div
            v-for="location in locationStore.selectedLocations"
            class="flex justify-between bg-sky-400 rounded-lg p-4 cursor-pointer"
            :key="location.id"
            @click="() => onSelectLocation(location)"
          >
            <p>
              <v-icon name="co-location-pin"></v-icon>
              <span>{{ location.name }}, {{ location.country }}</span>
            </p>
            <div
              class="text-red-600 cursor-pointer"
              @click="(e) => onRemoveSelectedLocation(e, location)"
            >
              <v-icon name="md-clear-outlined"></v-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useLocationStore } from '@/store/locationStore'
import type { SearchLocation } from '@/types'
import { useDateFormat, useNow } from '@vueuse/core'

const emits = defineEmits<{
  (e: 'close-menu'): void
}>()

const date = useDateFormat(useNow(), 'ddd, DD MMM YYYY')
const locationStore = useLocationStore()

const onSelectLocation = (location: SearchLocation) => {
  locationStore.setLocation(location)
}

const onRemoveSelectedLocation = (e: MouseEvent, location: SearchLocation) => {
  e.stopPropagation()
  locationStore.removeSelectedLocation(location)
}
</script>

<style scoped></style>
