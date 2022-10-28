<template>
  <div :class="['goal-page', { 'goal-page--dark': isThemeDarkActive }]">
    <div class="goal-page__menu">
      <router-link class="goal-page__menu__item" to="/">
        <ArrowLeftIcon :size="30" class="goal-page__return__icon" />
      </router-link>
      <ModeEditIcon
        @click="toggleEditGoalFormAction"
        class="goal-page__menu__item"
      />
      <DeleteOutlineIcon
        @click="toggleDelGoalDialog"
        class="goal-page__menu__item"
      />
    </div>
    <div class="goal-page__header">
      <div class="goal-page__header__title">
        <h1 class="goal-page__title" v-text="goal.title" />
        <div class="goal-page__until-date">
          <CalendarIcon class="goal-page__until-date__icon" />
          <span>
            {{ $t('goal.page.until.date') }}
            {{ $d(timeStampToDate(goal.deadline.seconds)) }}
          </span>
        </div>
      </div>
    </div>
    <TaskFilter />
    <TaskList />
    <BaseButton
      class="goal-page__button"
      :clickAction="toggleTaskForm"
      :label="$t('button.add.task')"
    />
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton'
import TaskFilter from '@/components/TaskFilter'
import TaskList from '@/components/TaskList'
import { useDialogStore } from '@/store/dialog'
import { useGoalStore } from '@/store/goals'
import { useToggleStore } from '@/store/toggle'
import { timeStampToDate } from '@/utils/TimeStampToDate'
import ArrowLeftIcon from '@icons/ArrowLeft.vue'
import CalendarIcon from '@icons/CalendarMonth.vue'
import DeleteOutlineIcon from '@icons/DeleteOutline.vue'
import ModeEditIcon from '@icons/Pen.vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'GoalPage',
  components: {
    ArrowLeftIcon,
    CalendarIcon,
    TaskFilter,
    TaskList,
    BaseButton,
    DeleteOutlineIcon,
    ModeEditIcon,
  },
  setup() {
    const { isThemeDarkActive } = storeToRefs(useToggleStore())
    const { toggleTaskForm, toggleEditGoalForm } = useToggleStore()
    const { setGoal, setEditGoal, setDelGoal } = useGoalStore()
    const { goal } = storeToRefs(useGoalStore())
    const { openDialog, closeDialog } = useDialogStore()
    const { deleteGoal, clearDelGoal } = useGoalStore()
    const route = useRoute()
    const router = useRouter()

    setGoal(route.params.id)

    const toggleEditGoalFormAction = () => {
      setEditGoal(route.params.id)
      toggleEditGoalForm()
    }

    const toggleDelGoalDialog = () => {
      setDelGoal(route.params.id)
      openDialog({
        showCloseButton: false,
        title: 'modal.confirmation.title',
        message: 'delete.goal.confirmation.message',
        cancelButton: {
          label: 'delete.goal.button.cancel',
          action: () => {
            clearDelGoal()
            closeDialog()
          },
        },
        confirmButton: {
          label: 'delete.goal.button.confirm',
          action: () => {
            deleteGoal()
            clearDelGoal()
            closeDialog()
            router.push({ name: 'home' })
          },
        },
      })
    }

    return {
      isThemeDarkActive,
      goal,
      toggleTaskForm,
      toggleEditGoalFormAction,
      toggleDelGoalDialog,
      timeStampToDate,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
