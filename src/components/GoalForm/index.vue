<template>
  <AddButton
    class="goal__button"
    :clickAction="toggleGoalForm"
    :label="$t('button.add.goal')"
  />
  <Teleport to="#modal">
    <transition name="goal__animate">
      <div v-if="isGoalFormActive" class="goal">
        <div class="goal__container">
          <div class="goal__header">
            <div class="goal__header__return" @click="toggleGoalForm">
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
              :label="$t('add.goal.form.deadline')"
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
import ArrowLeft from 'icons/ArrowLeft.vue'
import BaseInput from '@/components/BaseInput'
import DateSelector from '@/components/DateSelector'
import { useMessageStore } from '@/store/message'
import { useGoalStore } from '@/store/goals'
import { ref } from 'vue'

export default {
  name: 'GoalForm',
  components: {
    AddButton,
    ArrowLeft,
    BaseInput,
    DateSelector,
  },
  setup() {
    const isGoalFormActive = ref(false)
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

    const toggleGoalForm = () => {
      isGoalFormActive.value = !isGoalFormActive.value
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
        toggleGoalForm()
      }
    }

    return {
      goal: goal.value,
      toggleGoalForm,
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
