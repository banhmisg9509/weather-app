<template>
  <CurrentWeatherCardSkelaton v-if="isFetching" />
  <div v-else class="p-6 text-white bg-[rgba(0,0,0,0.3)] rounded-2xl col-span-2 md:col-span-1">
    <div class="flex justify-between">
      <div>
        <p>Current Weather</p>
        <p class="text-sm">{{ time }}</p>
      </div>
      <div class="md:hidden">
        <v-icon name="co-location-pin"></v-icon>
        <span
          >{{ locationStore.currentLocation.name }},
          {{ locationStore.currentLocation.country }}</span
        >
      </div>
    </div>
    <div class="flex flex-col justify-center">
      <div class="flex justify-center">
        <img
          class="scale-125"
          :src="`https:${currentWeather?.condition.icon}`"
          alt="condition icon"
          width="80"
          height="80"
        />
      </div>
      <div class="text-center">
        <p class="text-5xl relative font-bold">
          {{ currentWeather?.temp_c }}
          <span class="text-base absolute top-1">&#176;C</span>
        </p>
        <p>{{ currentWeather?.condition.text }}</p>
        <p class="text-sm">
          Feels like: <span>{{ currentWeather?.feelslike_c }}&#176;C</span>
        </p>
      </div>
      <div class="grid grid-cols-3 gap-2 mt-4 text-sm">
        <div class="flex flex-col items-center text-center">
          <v-icon name="wi-humidity"></v-icon>
          <span>{{ currentWeather?.humidity }}%</span>
        </div>
        <div class="flex flex-col items-center text-center">
          <v-icon name="wi-sandstorm"></v-icon>
          <span>{{ currentWeather?.wind_kph }} km/h</span>
        </div>
        <div class="flex flex-col items-center text-center">
          <v-icon name="bi-eye"></v-icon>
          <span>{{ currentWeather?.vis_km }} km/h</span>
        </div>
        <div class="flex flex-col items-center text-center">
          <v-icon name="wi-day-sunny"></v-icon>
          <span>{{ currentWeather?.uv }} </span>
        </div>
        <div class="flex flex-col items-center text-center">
          <v-icon name="ri-temp-cold-line"></v-icon>
          <span>{{ currentWeather?.pressure_mb }}mb</span>
        </div>
        <div class="flex flex-col items-center text-center">
          <v-icon
            name="io-navigate"
            :class="`rotate-[calc(-45deg+${currentWeather?.wind_degree}deg)]`"
          ></v-icon>
          <span>{{ currentWeather?.wind_degree }}&#176;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CurrentWeatherCardSkelaton from '@/components/CurrentWeatherCardSkelaton.vue'
import { useGetForecast } from '@/composables/useGetForecast'
import { useLocationStore } from '@/store/locationStore'
import { useDateFormat, useNow } from '@vueuse/core'
import { computed } from 'vue'

const time = useDateFormat(useNow(), 'h:mm A')

const locationStore = useLocationStore()
const q = computed(() => locationStore.currentLocation.name)
const { data, isFetching } = useGetForecast(q)
const currentWeather = computed(() => data.value?.current)
</script>
