<template>
  <div :class="['home-page', { 'home-page--dark': isThemeDarkActive }]">
    <MainNav />
    <MainHeader />
    <HomeBanner />
    <GoalsToStart />
    <GoalForm />
    <AddButton
      class="home-page__button"
      :clickAction="toggleGoalForm"
      :label="$t('button.add.goal')"
    />
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
import { useToggleStore } from '@/store/toggle'
import AddButton from '@/components/AddButton'

export default {
  name: 'HomePage',
  components: {
    MainHeader,
    HomeBanner,
    GoalForm,
    GoalsToStart,
    MainNav,
    AddButton,
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
