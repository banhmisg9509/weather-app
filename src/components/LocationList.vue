<template>
  <div
    @click="(e) => handleClick(e)"
    id="location-list-overlay"
    class="text-black fixed inset-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center"
  >
    <div id="location-list-content" class="w-[500px] min-h-[350px] bg-white rounded-lg p-6">
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
