<template>
  <router-view v-slot="{ Component }">
    <transition name="app__animate">
      <LoadingScreen v-if="isLoading" />
      <component v-else :is="Component" />
    </transition>
  </router-view>
  <MainNav />
  <ConfirmDialog />
  <CallbackMessage />
  <AddGoalForm />
  <EditGoalForm />
  <AddTaskForm />
  <EditTaskForm />
  <RegisterForm />
</template>

<script>
import { onBeforeMount, ref } from 'vue'
import LoadingScreen from '@/components/LoadingScreen'
import { useTaskStore } from '@/store/tasks'
import { useGoalStore } from '@/store/goals'
import CallbackMessage from '@/components/CallbackMessage/index.vue'
import ConfirmDialog from '@/components/ConfirmDialog/index.vue'
import AddGoalForm from '@/components/AddGoalForm/index.vue'
import EditGoalForm from '@/components/EditGoalForm/index.vue'
import AddTaskForm from '@/components/AddTaskForm/index.vue'
import EditTaskForm from '@/components/EditTaskForm/index.vue'
import MainNav from '@/components/MainNav'
import RegisterForm from '@/components/RegisterForm/index.vue'
import { useToggleStore } from '@/store/toggle'
import { storeToRefs } from 'pinia'
import { watchEffect } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useUserStore } from '@/store/user'

export default {
  name: 'AppComponent',
  components: {
    LoadingScreen,
    CallbackMessage,
    ConfirmDialog,
    AddGoalForm,
    EditGoalForm,
    AddTaskForm,
    EditTaskForm,
    MainNav,
    RegisterForm,
  },
  setup() {
    const isLoading = ref(true)
    const { isThemeDarkActive } = storeToRefs(useToggleStore())
    const { fetchTasks } = useTaskStore()
    const { fetchGoals } = useGoalStore()
    const { setUser } = useUserStore()

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

    const auth = getAuth()
    onBeforeMount(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user)
          fetchData()
        } else {
          isLoading.value = false
        }
      })
    })

    return {
      isLoading,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
