<template>
  <Teleport to="#modal">
    <transition name="task__animate">
      <transition name="task__animate">
        <div
          v-if="isEditTaskFormActive"
          :class="['task', { 'task--dark': isThemeDarkActive }]"
        >
          <div class="task__container">
            <div class="task__header">
              <div
                class="task__header__return"
                @click="toggleEditTaskFormAction"
              >
                <ArrowLeft />
              </div>
              <h1
                class="task__header__title"
                v-text="$t('update.task.page.title')"
              ></h1>
            </div>

            <div class="task__field">
              <BaseInput
                class="task__field__title"
                :label="$t('add.task.form.title')"
                v-model="task.title.txt"
                :error="task.title.error"
                type="text"
                @input="checkTitle"
              />
            </div>

            <div class="task__field">
              <BaseInput
                class="task__field__description"
                :label="$t('add.task.form.description')"
                v-model="task.description.txt"
                :error="task.description.error"
                type="text"
                @input="checkDescription"
                textarea
                :rows="10"
              />
            </div>
            <BaseButton
              @click="updateTaskAction"
              :label="$t('button.update.task')"
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
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useToggleStore } from '@/store/toggle'
import ArrowLeft from 'icons/ArrowLeft.vue'
import BaseInput from '@/components/BaseInput'
import { useMessageStore } from '@/store/message'
import { useTaskStore } from '@/store/tasks'

export default {
  name: 'EditTaskForm',
  components: {
    BaseButton,
    ArrowLeft,
    BaseInput,
  },
  setup() {
    const { isThemeDarkActive, isEditTaskFormActive } = storeToRefs(
      useToggleStore()
    )
    const { toggleEditTaskForm } = useToggleStore()
    const { setMessage } = useMessageStore()
    const { updateTask } = useTaskStore()
    const { editTask } = storeToRefs(useTaskStore())

    const task = ref({
      title: {
        txt: '',
        error: '',
      },
      description: {
        txt: '',
        error: '',
      },
    })

    watch(
      () => editTask.value,
      () => {
        task.value.title.txt = editTask.value.title
        task.value.description.txt = editTask.value.description
      }
    )

    const clearForm = () => {
      task.value.title.txt = ''
      task.value.title.error = ''
      task.value.description.txt = ''
      task.value.description.error = ''
    }

    const toggleEditTaskFormAction = () => {
      toggleEditTaskForm()
      clearForm()
    }

    const checkTitle = () => {
      const { title } = task.value
      if (!title.txt) {
        title.error = 'add.task.form.title.error.empty'
        return false
      }
      title.error = ''
      return true
    }

    const checkDescription = () => {
      const { description } = task.value
      if (!description.txt) {
        description.error = 'add.task.form.description.error.empty'
        return false
      }
      description.error = ''
      return true
    }

    const updateTaskAction = () => {
      const titleInput = checkTitle()
      const descriptionTextarea = checkDescription()

      if (!titleInput || !descriptionTextarea) {
        setMessage({
          active: true,
          text: 'add.task.form.error',
          error: true,
        })
      } else {
        updateTask({
          ...editTask.value,
          title: task.value.title.txt,
          description: task.value.description.txt,
        })
      }
    }

    return {
      isThemeDarkActive,
      isEditTaskFormActive,
      toggleEditTaskFormAction,
      task,
      checkTitle,
      checkDescription,
      updateTaskAction,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
