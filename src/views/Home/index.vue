<template>
  <div :class="['home-page', { 'home-page--dark': isThemeDark }]">
    <MainHeader />
    <HomeBanner />
    <LocaleSelection />
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader'
import HomeBanner from '@/components/HomeBanner'
import LocaleSelection from '@/components/LocaleSelection'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/store/theme'

export default {
  name: 'HomePage',
  components: {
    MainHeader,
    HomeBanner,
    LocaleSelection,
  },
  setup() {
    const { isThemeDark } = storeToRefs(useThemeStore())
    return {
      isThemeDark,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
