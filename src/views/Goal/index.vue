<template>
  <div :class="['goal-page', { 'goal-page--dark': isThemeDarkActive }]">
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
    <TaskList />
    <AddTaskForm />
    <EditTaskForm />
    <AddButton
      class="goal-page__button"
      :clickAction="toggleTaskForm"
      :label="$t('button.add.task')"
    />
  </div>
</template>

<script>
import ArrowLeftIcon from 'icons/ArrowLeft.vue'
import CalendarIcon from 'icons/CalendarMonth.vue'
import { storeToRefs } from 'pinia'
import { useToggleStore } from '@/store/toggle'
import { useGoalStore } from '@/store/goals'
import { useRoute } from 'vue-router'
import MainNav from '@/components/MainNav'
import TaskFilter from '@/components/TaskFilter'
import AddTaskForm from '@/components/AddTaskForm'
import EditTaskForm from '@/components/EditTaskForm'
import TaskList from '@/components/TaskList'
import AddButton from '@/components/AddButton'

export default {
  name: 'GoalPage',
  components: {
    ArrowLeftIcon,
    CalendarIcon,
    MainNav,
    TaskFilter,
    AddTaskForm,
    EditTaskForm,
    TaskList,
    AddButton,
  },
  setup() {
    const { isThemeDarkActive } = storeToRefs(useToggleStore())
    const { toggleTaskForm } = useToggleStore()
    const { fetchGoal } = useGoalStore()
    const { goal } = storeToRefs(useGoalStore())
    const route = useRoute()

    fetchGoal(route.params.id)

    return { isThemeDarkActive, goal, toggleTaskForm }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
