<template>
  <Teleport to="#modal">
    <CallbackMessage />
    <transition name="goal__animate">
      <div
        v-if="isGoalFormActive"
        :class="['goal', { 'goal--dark': isThemeDarkActive }]"
      >
        <div class="goal__container">
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
            v-model="goal.title.text"
            :error="goal.title.error"
            type="text"
            @input="checkTitle"
          />
          <div class="goal__deadline">
            <DateSelector
              :placeholder="$t('add.goal.form.deadline')"
              :label="$t('add.goal.form.title')"
              v-model="goal.deadline.text"
              :error="goal.deadline.error"
              @update:modelValue="checkDeadline"
            />
          </div>
          <BaseButton
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
import BaseButton from '@/components/BaseButton'
import CallbackMessage from '@/components/CallbackMessage'
import ArrowLeft from 'icons/ArrowLeft.vue'
import BaseInput from '@/components/BaseInput'
import DateSelector from '@/components/DateSelector'
import { useMessageStore } from '@/store/message'
import { useGoalStore } from '@/store/goals'
import { ref } from 'vue'
import { useToggleStore } from '@/store/toggle'
import { storeToRefs } from 'pinia'
import { useDialogStore } from '@/store/dialog'
import { useRouter } from 'vue-router'

export default {
  name: 'GoalForm',
  components: {
    BaseButton,
    ArrowLeft,
    BaseInput,
    DateSelector,
    CallbackMessage,
  },
  setup() {
    const { goalAlreadyExists } = useGoalStore()
    const { isThemeDarkActive, isGoalFormActive } = storeToRefs(
      useToggleStore()
    )
    const { toggleGoalForm } = useToggleStore()
    const { openDialog, closeDialog } = useDialogStore()
    const { goal: storeGoal } = storeToRefs(useGoalStore())
    const router = useRouter()

    const goal = ref({
      title: {
        text: '',
        error: '',
      },
      deadline: {
        text: '',
        error: '',
      },
    })

    const { setMessage } = useMessageStore()
    const { addGoal } = useGoalStore()

    const clearForm = () => {
      goal.value.title.text = ''
      goal.value.title.error = ''
      goal.value.deadline.text = ''
      goal.value.deadline.error = ''
    }

    const closeGoalForm = () => {
      toggleGoalForm()
      clearForm()
    }

    const checkTitle = () => {
      const { title } = goal.value
      if (!title.text) {
        title.error = 'add.goal.title.error.empty'
        return false
      }
      title.error = ''
      return true
    }

    const checkDeadline = () => {
      const { deadline } = goal.value
      if (!deadline.text) {
        deadline.error = 'add.goal.deadline.error.empty'
        return false
      }
      deadline.error = ''
      return true
    }

    const addGoalAction = () => {
      const titleInput = checkTitle()
      const deadlineInput = checkDeadline()
      const goalAlreadyExistsInput = goalAlreadyExists(goal.value.title.text)

      if (!titleInput || !deadlineInput) {
        setMessage({
          active: true,
          text: 'add.goal.form.error',
          error: true,
        })
      } else {
        addGoal({
          title: goal.value.title.text,
          deadline: goal.value.deadline.text,
        })
        if (!goalAlreadyExistsInput) {
          openDialog({
            showCloseButton: false,
            title: 'new.goal.add.task.modal.title',
            message: 'new.goal.add.task.modal.message',
            cancelButton: {
              label: 'new.goal.add.task.modal.button.cancel',
              action: closeDialog,
            },
            confirmButton: {
              label: 'new.goal.add.task.modal.button.confirm',
              action: () => {
                router.push({
                  name: 'goal',
                  params: {
                    id: storeGoal.value.id,
                  },
                })
                closeDialog()
              },
            },
          })
          closeGoalForm()
        }
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
