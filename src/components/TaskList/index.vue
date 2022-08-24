<template>
  <div class="task-list">
    <div v-for="(task, index) in filteredTasks" :key="index" class="task">
      {{ task.title }}

      <TaskCircleIcon />
      <TaskCircleDoneIcon />
      <MoreHorizIcon />
    </div>
  </div>
</template>

<script>
import TaskCircleIcon from 'icons/PanoramaFisheye.vue'
import TaskCircleDoneIcon from 'icons/CheckCircle.vue'
import MoreHorizIcon from 'icons/More.vue'
import { useRoute } from 'vue-router'
import { useTaskStore } from '@/store/tasks'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

export default {
  name: 'TaskList',
  components: {
    TaskCircleIcon,
    TaskCircleDoneIcon,
    MoreHorizIcon,
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
