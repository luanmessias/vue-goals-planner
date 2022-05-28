<template>
  <div :class="['home-page', { 'home-page--dark': isThemeDark }]">
    <MainHeader />
    <HomeBanner />
    <AddButton :label="$t('button.add.goal')" />
    <div style="height: 1000px; width: 100%; display: block" />
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader'
import HomeBanner from '@/components/HomeBanner'
import AddButton from '@/components/AddButton'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/store/theme'

export default {
  name: 'HomePage',
  components: {
    MainHeader,
    HomeBanner,
    AddButton,
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
