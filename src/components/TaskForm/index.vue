<template>
  <AddButton
    class="task__button"
    :clickAction="toggleTaskForm"
    :label="$t('button.add.task')"
  />
  <Teleport to="#modal">
    <transition name="task__animate">
      <transition name="task__animate">
        <div
          v-if="isTaskFormActive"
          :class="['task', { 'task--dark': isThemeDark }]"
        >
          <div
            :class="[
              'task__container',
              { 'task__container--dark': isThemeDark },
            ]"
          >
            <div class="task__header">
              <div class="task__header__return" @click="toggleTaskForm">
                <ArrowLeft />
              </div>
              <h1
                class="task__header__title"
                v-text="$t('add.task.page.title')"
              />
            </div>
          </div>
        </div>
      </transition>
    </transition>
  </Teleport>
</template>

<script>
import AddButton from '@/components/AddButton'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/store/theme'
import ArrowLeft from 'icons/ArrowLeft.vue'

export default {
  name: 'TaskForm',
  components: {
    AddButton,
    ArrowLeft,
  },
  setup() {
    const { isThemeDark } = storeToRefs(useThemeStore())
    const isTaskFormActive = ref(false)
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

    const toggleTaskForm = () => {
      isTaskFormActive.value = !isTaskFormActive.value
      clearForm()
    }

    return { isThemeDark, isTaskFormActive, toggleTaskForm, task }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
