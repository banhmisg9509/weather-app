<template>
  <div
    class="bg-[rgba(0,0,0,0.3)] rounded-2xl text-white p-4 md:p-6 col-span-2 md:col-span-1 flex flex-col"
  >
    <p>Air Quality Index</p>
    <div class="grid grid-cols-2 gap-2 mt-4 flex-1">
      <template v-if="isFetching">
        <div
          class="text-center flex flex-col items-center justify-center rounded-lg p-2 bg-gradient-to-r from-sky-700 to-sky-600 gap-1"
          v-for="aqi in range(8)"
          :key="aqi"
        >
          <span class="h-3 w-10 rounded-lg animate-pulse bg-sky-800"></span>
          <span class="h-3 w-8 rounded-lg animate-pulse bg-sky-800"></span>
        </div>
      </template>
      <template v-else>
        <div
          class="text-center flex flex-col items-center justify-center rounded-lg p-2"
          v-for="aqi in airQuality"
          :key="aqi.key"
          :class="aqi.bgColor"
        >
          <span>{{ aqi.value.toFixed(2) }}</span>
          <span class="text-sm uppercase">{{ aqi.key }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGetForecast } from '@/composables/useGetForecast'
import { getColor, range } from '@/includes/utils'
import { useLocationStore } from '@/store/locationStore'
import { computed } from 'vue'

const locationStore = useLocationStore()
const q = computed(() => locationStore.currentLocation.name)
const { data, isFetching } = useGetForecast(q)
const airQuality = computed(() => {
  if (!data.value) return []

  const { air_quality } = data.value.current
  return Object.entries(air_quality).map(([key, value]) => {
    return {
      key,
      value,
      bgColor: getColor(key, value)
    }
  })
})
</script>
