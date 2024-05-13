<template>
  <div class="bg-[rgba(0,0,0,0.2)] flex flex-col items-center rounded-xl p-4">
    <p>{{ day.date }}</p>
    <img :src="day.codition" alt="weather condition" />
    <p class="text-sm my-2">{{ day.text }}</p>
    <div class="rounded-full bg-gradient-to-r from-orange-500 to-green-400 w-full h-[1px]"></div>
    <div class="grid grid-cols-2 gap-2 mt-2 w-full">
      <div>
        <v-icon name="la-temperature-high-solid" color="orange" />
        <span class="text-sm text-orange-300">{{ day.maxTemp }}&#176;C</span>
      </div>
      <div>
        <v-icon name="la-temperature-low-solid" color="lime" />
        <span class="text-sm text-lime-400">{{ day.minTemp }}&#176;C</span>
      </div>
      <div>
        <v-icon name="gi-sunrise" />
        <span class="text-sm"> {{ day.sunRise }}</span>
      </div>
      <div>
        <v-icon name="gi-sunset" />
        <span class="text-sm"> {{ day.sunSet }}</span>
      </div>
      <div>
        <v-icon name="gi-raining"></v-icon>
        <span class="text-sm">{{ day.chanceOfRain }}%</span>
      </div>
      <div>
        <v-icon :name="day.moonPhaseIcon"></v-icon>
        <span class="text-sm">{{ day.moonIllumination }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ForcastDay } from '@/types'

defineProps<{
  day: ForcastDay
}>()
</script>
