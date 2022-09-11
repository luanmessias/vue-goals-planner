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
    <ConfirmDialog
      title="modal.confirmation.title"
      message="delete.goal.confirmation.message"
      cancelLabel="delete.goal.button.cancel"
      :cancelAction="cancelDeleteGoalAction"
      confirmLabel="delete.goal.button.confirm"
      :confirmAction="deleteGoalAction"
    />
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useToggleStore } from '@/store/toggle'
import { useGoalStore } from '@/store/goals'
import GoalInProgressItem from '@/components/GoalInProgressItem'
import ConfirmDialog from '@/components/ConfirmDialog'

export default {
  name: 'GoalsInProgressList',
  components: {
    GoalInProgressItem,
    ConfirmDialog,
  },
  setup() {
    const { getStartedGoals } = storeToRefs(useGoalStore())
    const { isThemeDarkActive } = storeToRefs(useToggleStore())
    const { toggleConfirmDialog } = useToggleStore()
    const { deleteGoal, clearDelGoal } = useGoalStore()

    const deleteGoalAction = () => {
      deleteGoal()
      clearDelGoal()
      toggleConfirmDialog()
    }

    const cancelDeleteGoalAction = () => {
      clearDelGoal()
      toggleConfirmDialog()
    }

    return {
      isThemeDarkActive,
      getStartedGoals,
      deleteGoalAction,
      cancelDeleteGoalAction,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
