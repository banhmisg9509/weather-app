<template>
  <div
    class="bg-[rgba(0,0,0,0.3)] rounded-2xl text-white p-4 md:p-6 col-span-2 md:col-span-1 flex flex-col"
  >
    <p>Air Quality Index</p>
    <div class="grid grid-cols-2 gap-2 mt-4 flex-1">
      <div
        class="text-center flex flex-col items-center justify-center rounded-lg p-2"
        v-for="aqi in airQuality"
        :key="aqi.name"
        :class="['bg-gradient-to-r', aqi.bgColor]"
      >
        <span>{{ aqi.value.toFixed(2) }}</span>
        <span class="text-sm uppercase">{{ aqi.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGetForecast } from '@/composables/useGetForecast'
import { useLocationStore } from '@/store/locationStore'
import { computed } from 'vue'

const locationStore = useLocationStore()
const q = computed(() => locationStore.currentLocation.name)
const { data } = useGetForecast(q)
const airQuality = computed(() => {
  if (!data.value) return []
  const { air_quality } = data.value.forecast.forecastday[0].day
  const formatAirQuality = Object.entries(air_quality).map(([key, value]) => {
    if (key.endsWith('index')) {
      key = key.replace('-index', '').replace(/[-]+/g, ' ')
    }
    return {
      name: key,
      bgColor: getColor[key] ? getColor[key](value) : 'bg-skyblue-500',
      value
    }
  })
  return formatAirQuality
})

const getColor: Record<string, Function> = {
  co: (value: number) => {
    if (value >= 9000) return 'from-purple-500 to-purple-400'
    if (value >= 4000) return 'from-red-500 to-red-400'
    if (value >= 1000) return 'from-yellow-500 to-yellow-400'
    return 'from-green-500 to-green-400'
  },
  o3: (value: number) => {
    if (value >= 241) return 'from-purple-500 to-purple-400'
    if (value >= 161) return 'from-red-500 to-red-400'
    if (value >= 101) return 'from-yellow-500 to-yellow-400'
    return 'from-green-500 to-green-400'
  },
  no2: (value: number) => {
    if (value >= 601) return 'from-purple-500 to-purple-400'
    if (value >= 401) return 'from-red-500 to-red-400'
    if (value >= 201) return 'from-yellow-500 to-yellow-400'
    return 'from-green-500 to-green-400'
  },
  so2: (value: number) => {
    if (value >= 1065) return 'from-purple-500 to-purple-400'
    if (value >= 533) return 'from-red-500 to-red-400'
    if (value >= 267) return 'from-yellow-500 to-yellow-400'
    return 'from-green-500 to-green-400'
  },
  pm2_5: (value: number) => {
    if (value >= 71) return 'from-purple-500 to-purple-400'
    if (value >= 54) return 'from-red-500 to-red-400'
    if (value >= 36) return 'from-yellow-500 to-yellow-400'
    return 'from-green-500 to-green-400'
  },
  pm10: (value: number) => {
    if (value >= 101) return 'from-purple-500 to-purple-400'
    if (value >= 76) return 'from-red-500 to-red-400'
    if (value >= 51) return 'from-yellow-500 to-yellow-400'
    return 'from-green-500 to-green-400'
  },
  'gb defra': (value: number) => {
    if (value >= 71) return 'from-purple-500 to-purple-400'
    if (value >= 54) return 'from-red-500 to-red-400'
    if (value >= 36) return 'from-yellow-500 to-yellow-400'
    return 'from-green-500 to-green-400'
  },
  'us epa': (value: number) => {
    if (value >= 5) return 'from-purple-500 to-purple-400'
    if (value >= 3) return 'from-red-500 to-red-400'
    if (value >= 2) return 'from-yellow-500 to-yellow-400'
    return 'from-green-500 to-green-400'
  }
}
</script>
