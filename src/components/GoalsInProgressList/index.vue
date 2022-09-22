<template>
  <div class="goals">
    <header
      :class="['goals__header', { 'goals__header--dark': isThemeDarkActive }]"
    >
      <h1 v-text="$t('goals.in.progress.title')" />
      <span class="goals__length" v-text="getStartedGoals.length" />
    </header>
    <div class="goals__container">
      <GoalInProgressItem
        v-for="goal in getStartedGoals"
        :goal="goal"
        :key="goal.id"
      />
    </div>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useToggleStore } from '@/store/toggle'
import { useGoalStore } from '@/store/goals'
import GoalInProgressItem from '@/components/GoalInProgressItem'

export default {
  name: 'GoalsInProgressList',
  components: {
    GoalInProgressItem,
  },
  setup() {
    const { getStartedGoals } = storeToRefs(useGoalStore())
    const { isThemeDarkActive } = storeToRefs(useToggleStore())

    return {
      isThemeDarkActive,
      getStartedGoals,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
