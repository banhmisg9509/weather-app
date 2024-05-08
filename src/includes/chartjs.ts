import { Chart, registerables } from 'chart.js'

import type { Plugin } from 'vue'

export default {
  install() {
    Chart.register(...registerables)
  }
} as Plugin
