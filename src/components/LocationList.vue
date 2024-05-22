<template>
  <div
    @click="(e) => handleClick(e)"
    id="location-list-overlay"
    class="text-black fixed inset-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center"
  >
    <div
      id="location-list-content"
      class="w-[500px] min-h-[350px] bg-sky-500 text-white rounded-lg"
    >
      <div class="w-full bg-sky-700 flex justify-between items-center px-6 py-2 rounded-t-lg">
        <div class="h-10 flex items-center">
          <p>Locations</p>
        </div>
        <div class="cursor-pointer" @click="emits('close-modal')">
          <v-icon name="md-clear-outlined" scale="1.2"></v-icon>
        </div>
      </div>
      <div class="p-6">
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
        <p class="mt-2">Other Locations</p>
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
              v-show="locationStore.currentLocation.name !== location.name"
              class="text-red-600 cursor-pointer transition-colors bg-transparent hover:bg-yellow-500 rounded-md px-1"
              @click="(e) => onRemoveSelectedLocation(e, location)"
            >
              <v-icon name="md-clear-outlined"></v-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLocationStore } from '@/store/locationStore'
import type { SearchLocation } from '@/types'

const emits = defineEmits<{
  (e: 'close-modal'): void
}>()

const locationStore = useLocationStore()

const handleClick = (e: MouseEvent) => {
  if ((e.target as HTMLDivElement)?.getAttribute('id') === 'location-list-overlay') {
    emits('close-modal')
  }
}

const onSelectLocation = (location: SearchLocation) => {
  locationStore.setLocation(location)
}

const onRemoveSelectedLocation = (e: MouseEvent, location: SearchLocation) => {
  e.stopPropagation()
  locationStore.removeSelectedLocation(location)
}
</script>
