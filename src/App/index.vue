<template>
  <router-view v-slot="{ Component }">
    <transition name="app__animate">
      <LoadingScreen v-if="isLoading" />
      <component v-else :is="Component" />
    </transition>
  </router-view>
  <Dialog />
</template>

<script>
import { ref } from 'vue'
import LoadingScreen from '@/components/LoadingScreen'
import { useTaskStore } from '@/store/tasks'
import { useGoalStore } from '@/store/goals'
import Dialog from '@/components/Dialog'

export default {
  name: 'AppComponent',
  components: {
    LoadingScreen,
    Dialog,
  },
  setup() {
    const isLoading = ref(true)
    const { fetchTasks } = useTaskStore()
    const { fetchGoals } = useGoalStore()

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
