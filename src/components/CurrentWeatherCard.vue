<template>
  <div class="p-6 text-white bg-[rgba(0,0,0,0.3)] rounded-2xl col-span-2 md:col-span-1">
    <p>Current Weather</p>
    <p class="text-sm">{{ time }}</p>
    <div class="flex flex-col justify-center">
      <div class="flex justify-center">
        <img
          class="scale-125"
          :src="`https://${data?.current.condition.icon}`"
          alt="condition icon"
        />
      </div>
      <div class="text-center">
        <p class="text-5xl relative font-bold">
          {{ data?.current.temp_c }}
          <span class="text-base absolute top-1">&#176;C</span>
        </p>
        <p>{{ data?.current.condition.text }}</p>
        <p class="text-sm">
          Feels like: <span>{{ data?.current.feelslike_c }}&#176;C</span>
        </p>
      </div>
      <div class="grid grid-cols-3 gap-2 mt-4 text-sm">
        <div class="flex flex-col items-center text-center">
          <v-icon name="wi-humidity"></v-icon>
          <span>{{ data?.current.humidity }}%</span>
        </div>
        <div class="flex flex-col items-center text-center">
          <v-icon name="wi-sandstorm"></v-icon>
          <span>{{ data?.current.wind_kph }} km/h</span>
        </div>
        <div class="flex flex-col items-center text-center">
          <v-icon name="bi-eye"></v-icon>
          <span>{{ data?.current.vis_km }} km/h</span>
        </div>
        <div class="flex flex-col items-center text-center">
          <v-icon name="wi-day-sunny"></v-icon>
          <span>{{ data?.current.uv }} </span>
        </div>
        <div class="flex flex-col items-center text-center">
          <v-icon name="ri-temp-cold-line"></v-icon>
          <span>{{ data?.current.pressure_mb }}mb</span>
        </div>
        <div class="flex flex-col items-center text-center">
          <v-icon
            name="io-navigate"
            :class="`rotate-[calc(-45deg+${data?.current.wind_degree}deg)]`"
          ></v-icon>
          <span>{{ data?.current.wind_degree }}&#176;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGetForecast } from '@/composables/useGetForecast'
import { useLocationStore } from '@/store/locationStore'
import { useDateFormat, useNow } from '@vueuse/core'
import { computed } from 'vue'

const time = useDateFormat(useNow(), 'h:mm A')

const locationStore = useLocationStore()
const q = computed(() => locationStore.currentLocation.name)
const { data } = useGetForecast(q)
</script>
