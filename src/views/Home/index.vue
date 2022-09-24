<template>
  <div :class="['home-page', { 'home-page--dark': isThemeDarkActive }]">
    <MainNav />
    <MainHeader />
    <HomeBanner />
    <GoalsToStart />
    <GoalsInProgressList />
    <BaseButton
      class="home-page__button"
      :clickAction="toggleGoalForm"
      :label="$t('button.add.goal')"
    />
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader'
import HomeBanner from '@/components/HomeBanner'
import GoalsToStart from '@/components/GoalsToStart'
import MainNav from '@/components/MainNav'
import { storeToRefs } from 'pinia'
import { useToggleStore } from '@/store/toggle'
import BaseButton from '@/components/BaseButton'
import GoalsInProgressList from '@/components/GoalsInProgressList'

export default {
  name: 'HomePage',
  components: {
    MainHeader,
    HomeBanner,
    GoalsToStart,
    MainNav,
    BaseButton,
    GoalsInProgressList,
  },
  setup() {
    const { isThemeDarkActive } = storeToRefs(useToggleStore())
    const { toggleGoalForm } = useToggleStore()

    return {
      isThemeDarkActive,
      toggleGoalForm,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
