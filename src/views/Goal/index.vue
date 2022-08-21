<template>
  <div :class="['goal-page', { 'goal-page--dark': isThemeDark }]">
    <MainNav />
    <div class="goal-page__return">
      <router-link to="/">
        <ArrowLeftIcon :size="30" class="goal-page__return__icon" />
      </router-link>
    </div>
    <h1 class="goal-page__title" v-text="goal.title" />
    <div class="goal-page__until-date">
      <CalendarIcon class="goal-page__until-date__icon" />
      <span>Until 18/05</span>
    </div>
    <TaskFilter />
    <TaskForm />
  </div>
</template>

<script>
import ArrowLeftIcon from 'icons/ArrowLeft.vue'
import CalendarIcon from 'icons/CalendarMonth.vue'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/store/theme'
import { useGoalStore } from '@/store/goals'
import { useRoute } from 'vue-router'
import MainNav from '@/components/MainNav'
import TaskFilter from '@/components/TaskFilter'
import TaskForm from '@/components/TaskForm'

export default {
  name: 'GoalPage',
  components: {
    ArrowLeftIcon,
    CalendarIcon,
    MainNav,
    TaskFilter,
    TaskForm,
  },
  setup() {
    const { isThemeDark } = storeToRefs(useThemeStore())
    const { fetchGoal } = useGoalStore()
    const { goal } = storeToRefs(useGoalStore())
    const route = useRoute()

    fetchGoal(route.params.id)

    return { isThemeDark, goal }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
