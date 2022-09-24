<template>
  <router-view v-slot="{ Component }">
    <transition name="app__animate">
      <LoadingScreen v-if="isLoading" />
      <component v-else :is="Component" />
    </transition>
  </router-view>
  <ConfirmDialog />
  <CallbackMessage />
  <GoalForm />
  <EditGoalForm />
  <AddTaskForm />
  <EditTaskForm />
</template>

<script>
import { ref } from 'vue'
import LoadingScreen from '@/components/LoadingScreen'
import { useTaskStore } from '@/store/tasks'
import { useGoalStore } from '@/store/goals'
import CallbackMessage from '@/components/CallbackMessage/index.vue'
import ConfirmDialog from '@/components/ConfirmDialog/index.vue'
import GoalForm from '@/components/GoalForm/index.vue'
import EditGoalForm from '@/components/EditGoalForm/index.vue'
import AddTaskForm from '@/components/AddTaskForm/index.vue'
import EditTaskForm from '@/components/EditTaskForm/index.vue'
import { useToggleStore } from '@/store/toggle'
import { storeToRefs } from 'pinia'
import { watchEffect } from 'vue'

export default {
  name: 'AppComponent',
  components: {
    LoadingScreen,
    CallbackMessage,
    ConfirmDialog,
    GoalForm,
    EditGoalForm,
    AddTaskForm,
    EditTaskForm,
  },
  setup() {
    const isLoading = ref(true)
    const { isThemeDarkActive } = storeToRefs(useToggleStore())
    const { fetchTasks } = useTaskStore()
    const { fetchGoals } = useGoalStore()

    watchEffect(() => {
      if (isThemeDarkActive.value) {
        document.body.classList.add('dark')
      } else {
        document.body.classList.remove('dark')
      }
    })

    const fetchData = async () => {
      try {
        await fetchTasks()
        await fetchGoals()
        isLoading.value = false
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()

    return {
      isLoading,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
