<template>
  <Teleport to="#modal">
    <CallbackMessage />
    <transition name="goal__animate">
      <div
        v-if="isGoalFormActive"
        :class="['goal', { 'goal--dark': isThemeDarkActive }]"
      >
        <div
          :class="[
            'goal__container',
            { 'goal__container--dark': isThemeDarkActive },
          ]"
        >
          <div class="goal__header">
            <div class="goal__header__return" @click="closeGoalForm">
              <ArrowLeft />
            </div>
            <h1
              class="goal__header__title"
              v-text="$t('add.goal.page.title')"
            />
          </div>
          <BaseInput
            class="goal__name"
            :label="$t('add.goal.form.title')"
            v-model="goal.title.value"
            :error="goal.title.error"
            type="text"
            @input="checkTitle"
          />
          <div class="goal__deadline">
            <DateSelector
              :placeholder="$t('add.goal.form.deadline')"
              v-model="goal.deadline.value"
              :error="goal.deadline.error"
              @update:modelValue="checkDeadline"
            />
          </div>
          <AddButton
            @click="addGoalAction"
            :label="$t('button.add.goal')"
            class="goal__add-button"
          />
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script>
import AddButton from '@/components/AddButton'
import CallbackMessage from '@/components/CallbackMessage'
import ArrowLeft from 'icons/ArrowLeft.vue'
import BaseInput from '@/components/BaseInput'
import DateSelector from '@/components/DateSelector'
import { useMessageStore } from '@/store/message'
import { useGoalStore } from '@/store/goals'
import { ref } from 'vue'
import { useToggleStore } from '@/store/toggle'
import { storeToRefs } from 'pinia'

export default {
  name: 'GoalForm',
  components: {
    AddButton,
    ArrowLeft,
    BaseInput,
    DateSelector,
    CallbackMessage,
  },
  setup() {
    const { isThemeDarkActive, isGoalFormActive } = storeToRefs(
      useToggleStore()
    )
    const { toggleGoalForm } = useToggleStore()
    const goal = ref({
      title: {
        value: '',
        error: '',
      },
      deadline: {
        value: '',
        error: '',
      },
    })

    const { setMessage } = useMessageStore()
    const { addGoal } = useGoalStore()

    const clearForm = () => {
      goal.value.title.value = ''
      goal.value.title.error = ''
      goal.value.deadline.value = ''
      goal.value.deadline.error = ''
    }

    const closeGoalForm = () => {
      toggleGoalForm()
      clearForm()
    }

    const checkTitle = () => {
      const { title } = goal.value
      if (!title.value) {
        title.error = 'add.goal.title.error.empty'
        return false
      }
      title.error = ''
      return true
    }

    const checkDeadline = () => {
      const { deadline } = goal.value
      if (!deadline.value) {
        deadline.error = 'add.goal.deadline.error.empty'
        return false
      }
      deadline.error = ''
      return true
    }

    const addGoalAction = () => {
      const titleInput = checkTitle()
      const deadlineInput = checkDeadline()

      if (!titleInput || !deadlineInput) {
        setMessage({
          active: true,
          text: 'add.goal.form.error',
          error: true,
        })
      } else {
        addGoal({
          title: goal.value.title.value,
          deadline: goal.value.deadline.value,
        })
        closeGoalForm()
      }
    }

    return {
      isThemeDarkActive,
      goal: goal.value,
      closeGoalForm,
      isGoalFormActive,
      checkDeadline,
      addGoalAction,
      checkTitle,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
