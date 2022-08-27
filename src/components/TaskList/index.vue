<template>
  <div class="task-list">
    <template v-for="(task, index) in filteredTasks" :key="index">
      <TaskItem :task="task" />
    </template>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useTaskStore } from '@/store/tasks'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import TaskItem from '@/components/TaskItem'

export default {
  name: 'TaskList',
  components: {
    TaskItem,
  },
  setup() {
    const { getAllGoalTasks } = useTaskStore()
    const { filteredTasks } = storeToRefs(useTaskStore())
    const route = useRoute()

    onMounted(() => {
      getAllGoalTasks(route.params.id)
    })

    return { filteredTasks }
  },
}
</script>

<style lang="scss" scoped>
@import 'styles';
</style>
