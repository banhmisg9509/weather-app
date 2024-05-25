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
import { computed, shallowRef } from 'vue'
import { Line } from 'vue-chartjs'

import { useLocationStore } from '@/store/locationStore'
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Filler,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip
} from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation'

import type { HourlyForecast } from '@/types'
Chart.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Tooltip,
  Title,
  Filler,
  annotationPlugin
)
Chart.defaults.color = '#fff'
Chart.defaults.borderColor = '#fff'
Chart.defaults.font = {
  family: 'Poppins',
  size: 14
}

const locationStore = useLocationStore()
const q = computed(() => locationStore.currentLocation.name)
const { data } = useGetForecast(q)

const chartData = computed<ChartData<'line'>>(() => {
  if (!data.value) {
    return {
      datasets: []
    }
  }

  const offset = new Date().getHours()
  const forecastHour = data.value.forecast.forecastday
    .slice(0, 2)
    .reduce((hours, day) => hours.concat(day.hour), [] as HourlyForecast[])
    .slice(offset, offset + 24)

  return {
    labels: forecastHour.map((item) => item.time.split(' ').pop()),
    datasets: [
      {
        data: forecastHour.map((item) => item.temp_c),
        label: 'Temperature',
        borderColor: 'orange',
        borderDash: [2, 2],
        pointBackgroundColor: 'transparent',
        backgroundColor: (context: any) => {
          if (!context.chart.chartArea) {
            return
          }

          const bgColors = ['#FFA500', '#FFD700 ', '#008000']

          const {
            ctx,
            chartArea: { top, bottom }
          } = context.chart

          const gradientBg = ctx.createLinearGradient(0, top, 0, bottom)
          const colorTranches = 1 / (bgColors.length - 1)
          for (let i = 0; i < bgColors.length; i++) {
            gradientBg.addColorStop(0 + i * colorTranches, bgColors[i])
          }
          return gradientBg
        },
        yAxisID: 'y',
        fill: true
      }
    ]
  }
})

const chartOptions = shallowRef<ChartOptions<'line'>>({
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        callback: function (val, index) {
          return index % 2 === 0 ? this.getLabelForValue(val as number) : ''
        },
        autoSkip: false
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
    },
    legend: {
      display: false
    },
    annotation: {
      annotations: {
        dayDivide: {
          borderWidth: 1,
          borderDash: [3, 3],
          type: 'line',
          value: '00:00',
          scaleID: 'x',
          label: {
            display: true,
            content: new Date().toLocaleDateString(),
            position: 'start',
            backgroundColor: 'rgba(0,0,0,0.1)',
            padding: 6,
            font: {
              size: 12
            }
          }
        }
      }
    }
  },
  resizeDelay: 300
})
</script>
