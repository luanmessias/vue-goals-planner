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
            :label="$t('add.goal.form.name')"
            v-model="goal.title"
            type="text"
          />
          <div class="goal__deadline">
            <DateSelector
              :label="$t('add.goal.form.deadline')"
              v-model="goal.deadline"
            />
          </div>
          <AddButton :label="$t('button.add.goal')" class="goal__add-button" />
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
  data() {
    return {
      goal: {
        title: '',
        deadline: '',
      },
    }
  },
  setup() {
    const isGoalFormActive = ref(false)

    const toggleGoalForm = () => {
      isGoalFormActive.value = !isGoalFormActive.value
    }

    return {
      toggleGoalForm,
      isGoalFormActive,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
