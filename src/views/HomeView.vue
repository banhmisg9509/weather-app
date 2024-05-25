<template>
  <section class="mt-2 p-2 grid md:grid-cols-[1fr_2fr_1fr] gap-2 lg:container lg:mx-auto">
    <CurrentWeatherCard />
    <HourlyForecastCard />
    <AirQualityCard />
    <FutureForecastCard />
  </section>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const CurrentWeatherCard = defineAsyncComponent(() => import('@/components/CurrentWeatherCard.vue'))
const AirQualityCard = defineAsyncComponent(() => import('@/components/AirQualityCard.vue'))
const FutureForecastCard = defineAsyncComponent(() => import('@/components/FutureForecastCard.vue'))
const HourlyForecastCard = defineAsyncComponent(() => import('@/components/HourlyForecastCard.vue'))
</script>
