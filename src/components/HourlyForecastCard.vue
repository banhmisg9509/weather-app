<template>
  <div
    class="bg-[rgba(0,0,0,0.3)] rounded-2xl p-4 md:p-6 col-span-2 text-white min-w-full min-h-[350px]"
  >
    <Line
      chart-id="hourly-forecast"
      :data="chartData"
      :options="chartOptions"
      ref="chartInstance"
    />
  </div>
</template>

<script setup lang="ts">
import { useGetForecast } from '@/composables/useGetForecast'
import type { ChartData, ChartOptions } from 'chart.js'
import { computed, ref, shallowReactive, watchEffect } from 'vue'
import { Line, type ChartComponentRef } from 'vue-chartjs'

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
import annotationPlugin, { type AnnotationOptions } from 'chartjs-plugin-annotation'
import chartDataLabels from 'chartjs-plugin-datalabels'

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
  annotationPlugin,
  chartDataLabels
)
Chart.defaults.color = '#fff'
Chart.defaults.borderColor = '#fff'
Chart.defaults.font = {
  family: 'Poppins',
  size: 14
}

const ONE_DAY = 86_400_000

const locationStore = useLocationStore()
const q = computed(() => locationStore.currentLocation.name)
const { data } = useGetForecast(q)

const chartInstance = ref<ChartComponentRef>()

const forecastHour = computed(() => {
  if (!data.value) return []

  const offset = new Date().getHours()
  return data.value.forecast.forecastday
    .slice(0, 2)
    .reduce((hours, day) => hours.concat(day.hour), [] as HourlyForecast[])
    .slice(offset, offset + 24)
})

const chartData = computed<ChartData<'line'>>(() => {
  if (forecastHour.value.length === 0) {
    return {
      datasets: []
    }
  }

  return {
    labels: forecastHour.value.map((item) => item.time.split(' ').pop()),
    datasets: [
      {
        data: forecastHour.value.map((item) => item.temp_c),
        label: 'Temperature',
        borderWidth: 1,
        pointStyle: false,
        backgroundColor: (context) => {
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
        fill: true,
        datalabels: {
          color: 'white',
          align: 'end',
          font: (context) => {
            var w = context.chart.width
            return {
              size: w < 512 ? 12 : 14
            }
          },
          formatter: (value, context) => {
            return context.dataIndex % 2 === 1 ? '' : value + '°'
          }
        }
      }
    ]
  }
})

const chartOptions = shallowReactive<ChartOptions<'line'>>({
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        callback: function (val, index) {
          return index % 2 === 1 ? '' : this.getLabelForValue(val as number)
        },
        font: (context) => {
          var w = context.chart.width
          return {
            size: w < 512 ? 12 : 14
          }
        }
      }
    },
    y: {
      type: 'linear',
      display: false,
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
        dayDevide: {
          borderWidth: 1,
          borderDash: [3, 3],
          type: 'line',
          value: '00:00',
          scaleID: 'x'
        },
        today: {
          type: 'label',
          content: new Date().toLocaleDateString('vi'),
          rotation: -90,
          xValue: '00:00',
          xAdjust: -10,
          yAdjust: -90,
          color: 'white',
          font: {
            size: 12
          }
        },
        tomorrow: {
          type: 'label',
          content: new Date(new Date().getTime() + ONE_DAY).toLocaleDateString('vi'),
          rotation: -90,
          xValue: '00:00',
          xAdjust: 10,
          yAdjust: -90,
          color: 'white',
          font: {
            size: 12
          }
        }
      },
      clip: false
    }
  },
  resizeDelay: 300
})

watchEffect(() => {
  if (!chartInstance.value || forecastHour.value.length === 0) return

  const conditions: AnnotationOptions[] = []
  forecastHour.value.forEach((item, index) => {
    if (index % 2 === 0) {
      const img = new Image(30, 30)
      img.src = 'https:' + item.condition.icon

      conditions.push({
        type: 'label',
        xValue: item.time.split(' ').pop(),
        yValue: item.temp_c,
        content: img,
        width: 30,
        height: 30
      })
    }
  })

  if (chartInstance.value.chart?.options.plugins?.annotation) {
    chartInstance.value.chart.options.plugins.annotation.annotations = {
      ...chartOptions.plugins?.annotation?.annotations,
      ...conditions
    }
  }
})
</script>
