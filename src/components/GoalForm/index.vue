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
          <pre>
            {{ goal }}
          </pre>
          <BaseInput
            class="goal__name"
            :label="$t('add.goal.form.title')"
            v-model="goal.title.value"
            :error="goal.title.error"
            :error-message="goal.title.message"
            type="text"
          />
          <div class="goal__deadline">
            <DateSelector
              :label="$t('add.goal.form.deadline')"
              v-model="goal.deadline.value"
              :error="goal.deadline.error"
              :error-message="goal.deadline.message"
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
        error: false,
        errorMsg: '',
      },
      deadline: {
        value: '',
        error: false,
        errorMsg: '',
      },
    })

    const toggleGoalForm = () => {
      isGoalFormActive.value = !isGoalFormActive.value
    }

    const checkTitle = () => {
      const { title } = goal.value
      if (!title.value) {
        title.error = true
        title.errorMsg = 'add.goal.title.error.empty'
        return false
      }
      return true
    }

    const checkDeadline = () => {
      const { title } = goal.value
      if (!title.value) {
        title.error = true
        title.errorMsg = 'add.goal.title.error.empty'
        return false
      }
      return true
    }

    const addGoalAction = () => {
      console.log(goal.value)
      checkTitle()
      checkDeadline()
    }

    return {
      goal: goal.value,
      toggleGoalForm,
      isGoalFormActive,
      addGoalAction,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
