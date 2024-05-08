import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
  BiEye,
  BiSearch,
  CoLocationPin,
  GiHamburgerMenu,
  GiRaining,
  GiSunrise,
  GiSunset,
  IoNavigate,
  LaTemperatureHighSolid,
  LaTemperatureLowSolid,
  MdClearOutlined,
  RiTempColdLine,
  WiDaySunny,
  WiHumidity,
  WiMoonAltFirstQuarter,
  WiMoonAltFull,
  WiMoonAltNew,
  WiMoonAltThirdQuarter,
  WiMoonAltWaningCrescent1,
  WiMoonAltWaningGibbous1,
  WiMoonAltWaxingCrescent1,
  WiMoonAltWaxingGibbous1,
  WiSandstorm
} from 'oh-vue-icons/icons'
import type { Plugin } from 'vue'

addIcons(
  BiEye,
  BiSearch,
  CoLocationPin,
  GiHamburgerMenu,
  GiRaining,
  GiSunrise,
  GiSunset,
  IoNavigate,
  LaTemperatureHighSolid,
  LaTemperatureLowSolid,
  MdClearOutlined,
  RiTempColdLine,
  WiDaySunny,
  WiHumidity,
  WiMoonAltFirstQuarter,
  WiMoonAltFull,
  WiMoonAltNew,
  WiMoonAltThirdQuarter,
  WiMoonAltWaningCrescent1,
  WiMoonAltWaningGibbous1,
  WiMoonAltWaxingCrescent1,
  WiMoonAltWaxingGibbous1,
  WiSandstorm
)

export default {
  install(app) {
    app.component('v-icon', OhVueIcon)
  }
} as Plugin
