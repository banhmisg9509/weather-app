<template>
  <div
    class="bg-[rgba(0,0,0,0.3)] rounded-2xl p-4 md:p-6 col-span-2 text-white min-w-full min-h-[350px]"
  >
    <Line chart-id="hourly-forecast" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { useGetForecast } from '@/composables/useGetForecast'
import type { ChartData, ChartOptions } from 'chart.js'
import { computed, shallowRef, watch } from 'vue'
import { Line } from 'vue-chartjs'

import { useLocationStore } from '@/store/locationStore'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)
Chart.defaults.color = '#fff'
Chart.defaults.borderColor = '#fff'
Chart.defaults.font = {
  family: 'Poppins',
  size: 12
}

const locationStore = useLocationStore()
const q = computed(() => locationStore.currentLocation.name)
const { data } = useGetForecast(q)

const chartData = shallowRef<ChartData<'line'>>({
  datasets: []
})

const chartOptions = shallowRef<ChartOptions<'line'>>({
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      type: 'linear',
      display: true,
      position: 'left',
      grid: {
        display: false
      },
      border: {
        color: 'transparent'
      }
    },
    y1: {
      type: 'linear',
      display: true,
      position: 'right',
      grid: {
        display: false
      },
      border: {
        color: 'transparent'
      }
    }
  },
  elements: {
    line: {
      tension: 0.4
    }
  },
  plugins: {
    title: {
      display: true,
      position: 'top',
      text: 'Hourly Forecast',
      font: {
        size: 18,
        weight: 300
      }
    }
  },
  resizeDelay: 300
})

watch(data, (newData) => {
  if (!newData) return
  const forecastToday = newData.forecast.forecastday[0]

  chartData.value = {
    labels: forecastToday.hour.map((item) => item.time.split(' ').pop()),
    datasets: [
      {
        data: forecastToday.hour.map((item) => item.humidity),
        label: 'Humidity',
        borderColor: 'skyblue',
        yAxisID: 'y'
      },
      {
        data: forecastToday.hour.map((item) => item.temp_c),
        label: 'Temperature',
        borderColor: 'orange',
        yAxisID: 'y1'
      }
    ]
  }
})
</script>
