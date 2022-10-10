<template>
  <div :class="['goals', { 'goals--dark': isThemeDarkActive }]">
    <header class="goals__header">
      <h1 v-text="$t('goals.in.progress.title')"></h1>
      <span class="goals__length" v-text="getStartedGoals.length"></span>
    </header>
    <div class="goals__container">
      <template v-if="getStartedGoals.length">
        <GoalInProgressItem
          v-for="goal in getStartedGoals"
          :goal="goal"
          :key="goal.id"
        />
      </template>
      <div class="goals__empty" v-else>
        <div class="goals__empty__content">
          <span v-text="$t('home.goals.in.progress.empty.message')"></span>
        </div>
      </div>
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
