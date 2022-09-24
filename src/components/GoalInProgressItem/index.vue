<template>
  <div :class="['goal', { 'goal--dark': isThemeDarkActive }]">
    <router-link class="goal__link" :to="`/goal/${goal.id}`">
      <div class="goal__content">
        <div
          class="goal__percent"
          :style="{
            background: isThemeDarkActive
              ? `conic-gradient(#ffb057 ${percent}%, #0c2026 0deg)`
              : `conic-gradient(#ffb057 ${percent}%, #ededed 0deg)`,
          }"
        >
          <span class="goal__percent__value" v-text="`${percent}%`" />
        </div>
        <div class="goal__info">
          <h3 class="goal__title" v-text="goal.title" />
          <div class="goal__date">
            <CalendarIcon class="goal__date__icon" />
            <span
              class="goal__date__txt"
              v-text="$d(timeStampToDate(goal.deadline.seconds))"
            />
          </div>
        </div>
      </div>
    </router-link>

    <div :class="['goal__details', { 'goal__details--active': goalActive }]">
      <div
        :class="['goal__options', { 'goal__options--active': goalActive }]"
        @click="goalActive = !goalActive"
      >
        <div v-if="goalActive" class="goal__options__close-dot" />
        <div class="goal__options__dot" />
        <div v-if="goalActive" class="goal__options__close-dot" />
      </div>

      <ModeEditIcon
        class="goal__details__edit"
        v-if="goalActive"
        @click="toggleEditGoalFormAction"
      />
      <DeleteOutlineIcon
        class="goal__details__delete"
        v-if="goalActive"
        @click="toggleDelGoalDialog"
      />
    </div>
  </div>
</template>

<script>
import CalendarIcon from 'icons/CalendarMonth.vue'
import { timeStampToDate } from '@/utils/TimesStampToDate'
import { useGoalStore } from '@/store/goals'
import { ref } from 'vue'
import DeleteOutlineIcon from 'icons/DeleteOutline.vue'
import ModeEditIcon from 'icons/Pen.vue'
import { useToggleStore } from '@/store/toggle'
import { useDialogStore } from '@/store/dialog'
import { storeToRefs } from 'pinia'

export default {
  name: 'GoalInProgressItem',
  components: {
    CalendarIcon,
    DeleteOutlineIcon,
    ModeEditIcon,
  },
  props: {
    goal: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { getGoalDonePercentage, setDelGoal, setEditGoal } = useGoalStore()
    const { toggleEditGoalForm } = useToggleStore()
    const percent = getGoalDonePercentage(props.goal.id)
    const goalActive = ref(false)
    const { openDialog, closeDialog } = useDialogStore()
    const { deleteGoal, clearDelGoal } = useGoalStore()
    const { isThemeDarkActive } = storeToRefs(useToggleStore())

    const toggleEditGoalFormAction = () => {
      setEditGoal(props.goal.id)
      toggleEditGoalForm()
    }

    const toggleDelGoalDialog = () => {
      setDelGoal(props.goal.id)
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
          },
        },
      })
    }

    return {
      timeStampToDate,
      getGoalDonePercentage,
      percent,
      goalActive,
      toggleDelGoalDialog,
      toggleEditGoalFormAction,
      isThemeDarkActive,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
