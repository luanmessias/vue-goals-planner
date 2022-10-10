<template>
  <Teleport to="#modal">
    <transition name="goal__animate">
      <div
        v-if="isEditGoalFormActive"
        :class="['goal', { 'goal--dark': isThemeDarkActive }]"
      >
        <div class="goal__container">
          <div class="goal__header">
            <div class="goal__header__return" @click="closeEditGoalForm">
              <ArrowLeft />
            </div>
            <h1
              class="goal__header__title"
              v-text="$t('update.goal.page.title')"
            ></h1>
          </div>
          <BaseInput
            class="goal__name"
            :label="$t('add.goal.form.title')"
            v-model="goal.title.txt"
            :error="goal.title.error"
            type="text"
            @input="checkTitle"
          />
          <div class="goal__deadline">
            <DateSelector
              :placeholder="$t('add.goal.form.deadline')"
              :label="$t('add.goal.form.title')"
              v-model="goal.deadline.txt"
              :error="goal.deadline.error"
              :startDate="goal.deadline.txt"
              @update:modelValue="checkDeadline"
            />
          </div>
          <BaseButton
            @click="updateGoalAction"
            :label="$t('button.update.goal')"
            class="goal__add-button"
          />
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script>
import ArrowLeft from '@icons/ArrowLeft.vue'
import { useToggleStore } from '@/store/toggle'
import { storeToRefs } from 'pinia'
import { watch, ref } from 'vue'
import { useGoalStore } from '@/store/goals'
import BaseInput from '@/components/BaseInput'
import DateSelector from '@/components/DateSelector'
import {
  secondsAndNanosecondsToDate,
  dateToSecondsAndNanoseconds,
} from '@/utils/TimesStampToDate'
import { useMessageStore } from '@/store/message'
import BaseButton from '@/components/BaseButton'

export default {
  name: 'EditGoalForm',
  components: {
    ArrowLeft,
    BaseInput,
    DateSelector,
    BaseButton,
  },
  setup() {
    const { isEditGoalFormActive } = storeToRefs(useToggleStore())
    const { toggleEditGoalForm, isThemeDarkActive } = useToggleStore()
    const { editGoal } = storeToRefs(useGoalStore())
    const { setMessage } = useMessageStore()
    const { updateGoal } = useGoalStore()

    const goal = ref({
      title: {
        txt: '',
        error: '',
      },
      deadline: {
        txt: '',
        error: '',
      },
    })

    watch(
      () => editGoal.value,
      () => {
        goal.value.title.txt = editGoal.value.title
        goal.value.deadline.txt = secondsAndNanosecondsToDate(
          editGoal.value.deadline.seconds,
          editGoal.value.deadline.nanoseconds
        )
      }
    )

    const clearForm = () => {
      goal.value.title.txt = ''
      goal.value.title.error = ''
      goal.value.deadline.txt = ''
      goal.value.deadline.error = ''
    }

    const closeEditGoalForm = () => {
      toggleEditGoalForm()
      clearForm()
    }

    const checkTitle = () => {
      const { title } = goal.value
      if (!title.txt) {
        title.error = 'add.goal.title.error.empty'
        return false
      }
      title.error = ''
      return true
    }

    const checkDeadline = () => {
      const { deadline } = goal.value
      if (!deadline.txt) {
        deadline.error = 'add.goal.deadline.error.empty'
        return false
      }
      deadline.error = ''
      return true
    }

    const updateGoalAction = () => {
      const titleInput = checkTitle()
      const deadlineInput = checkDeadline()

      if (!titleInput || !deadlineInput) {
        setMessage({
          active: true,
          text: 'update.goal.form.error',
          error: true,
        })
      } else {
        updateGoal({
          ...editGoal.value,
          title: goal.value.title.txt,
          deadline: dateToSecondsAndNanoseconds(goal.value.deadline.txt),
        })
      }
    }

    return {
      isEditGoalFormActive,
      toggleEditGoalForm,
      isThemeDarkActive,
      goal,
      checkTitle,
      checkDeadline,
      secondsAndNanosecondsToDate,
      closeEditGoalForm,
      updateGoalAction,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
