<template>
  <div :class="['home-page', { 'home-page--dark': isThemeDark }]">
    <MainNav />
    <MainHeader />
    <HomeBanner />
    <GoalsToStart />
    <GoalForm />
    <div style="height: 1000px; width: 100%; display: block" />
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader'
import HomeBanner from '@/components/HomeBanner'
import GoalForm from '@/components/GoalForm'
import GoalsToStart from '@/components/GoalsToStart'
import MainNav from '@/components/MainNav'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/store/theme'

export default {
  name: 'HomePage',
  components: {
    MainHeader,
    HomeBanner,
    GoalForm,
    GoalsToStart,
    MainNav,
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
