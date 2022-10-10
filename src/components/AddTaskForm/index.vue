<template>
  <Teleport to="#modal">
    <transition name="task__animate">
      <transition name="task__animate">
        <div
          v-if="isTaskFormActive"
          :class="['task', { 'task--dark': isThemeDarkActive }]"
        >
          <div class="task__container">
            <div class="task__header">
              <div class="task__header__return" @click="toggleTaskFormAction">
                <ArrowLeft />
              </div>
              <h1
                class="task__header__title"
                v-text="$t('add.task.page.title')"
              ></h1>
            </div>

            <div class="task__field">
              <BaseInput
                class="task__field__title"
                :label="$t('add.task.form.title')"
                v-model="task.title.value"
                :error="task.title.error"
                type="text"
                @input="checkTitle"
              />
            </div>

            <div class="task__field">
              <BaseInput
                class="task__field__description"
                :label="$t('add.task.form.description')"
                v-model="task.description.value"
                :error="task.description.error"
                type="text"
                @input="checkDescription"
                textarea
                :rows="10"
              />
            </div>
            <BaseButton
              @click="addTaskAction"
              :label="$t('button.add.task')"
              class="task__add-button"
            />
          </div>
        </div>
      </transition>
    </transition>
  </Teleport>
</template>

<script>
import BaseButton from '@/components/BaseButton'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useToggleStore } from '@/store/toggle'
import ArrowLeft from 'icons/ArrowLeft.vue'
import BaseInput from '@/components/BaseInput'
import { useMessageStore } from '@/store/message'
import { useTaskStore } from '@/store/tasks'
import { useRoute } from 'vue-router'

export default {
  name: 'AddTaskForm',
  components: {
    BaseButton,
    ArrowLeft,
    BaseInput,
  },
  setup() {
    const { isThemeDarkActive, isTaskFormActive } = storeToRefs(
      useToggleStore()
    )
    const { toggleTaskForm } = useToggleStore()
    const { setMessage } = useMessageStore()
    const { addTask } = useTaskStore()
    const route = useRoute()
    const task = ref({
      title: {
        value: '',
        error: '',
      },
      description: {
        value: '',
        error: '',
      },
    })

    const clearForm = () => {
      task.value.title.value = ''
      task.value.title.error = ''
      task.value.description.value = ''
      task.value.description.error = ''
    }

    const toggleTaskFormAction = () => {
      toggleTaskForm()
      clearForm()
    }

    const checkTitle = () => {
      const { title } = task.value
      if (!title.value) {
        title.error = 'add.task.form.title.error.empty'
        return false
      }
      title.error = ''
      return true
    }

    const checkDescription = () => {
      const { description } = task.value
      if (!description.value) {
        description.error = 'add.task.form.description.error.empty'
        return false
      }
      description.error = ''
      return true
    }

    const addTaskAction = () => {
      const titleInput = checkTitle()
      const descriptionTextarea = checkDescription()

      if (!titleInput || !descriptionTextarea) {
        setMessage({
          active: true,
          text: 'add.task.form.error',
          error: true,
        })
      } else {
        addTask({
          title: task.value.title.value,
          description: task.value.description.value,
          goal: route.params.id,
        })
        toggleTaskFormAction()
      }
    }

    return {
      isThemeDarkActive,
      isTaskFormActive,
      toggleTaskFormAction,
      task,
      checkTitle,
      checkDescription,
      addTaskAction,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
