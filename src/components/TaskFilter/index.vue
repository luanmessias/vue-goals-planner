<template>
  <div class="task-filter">
    <div
      :class="['task-filter__opt', { 'task-filter__opt--active': opt.active }]"
      v-for="(opt, index) in options"
      :key="index"
      @click="activeOption(index)"
    >
      <span class="task-filter__opt__title" v-text="$t(opt.title)" />
      <span class="task-filter__opt__length" v-text="opt.length" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useTaskStore } from '@/store/tasks'
import { useRoute } from 'vue-router'
export default {
  name: 'TaskFilter',
  props: {
    goal: {
      type: String,
      default: '',
    },
  },
  setup() {
    const {
      getAllGoalTasks,
      getAllGoalTasksLength,
      getAllToDoGoalTasks,
      getAllToDoGoalTasksLength,
      getAllDoneGoalTasks,
      getAllDoneGoalTasksLength,
    } = useTaskStore()
    const route = useRoute()
    const goalId = route.params.id
    const options = ref([
      {
        title: 'task.filter.all',
        length: getAllGoalTasksLength(goalId),
        active: true,
        action: () => getAllGoalTasks(goalId),
      },
      {
        title: 'task.filter.to.do',
        length: getAllToDoGoalTasksLength(goalId),
        active: false,
        action: () => getAllToDoGoalTasks(goalId),
      },
      {
        title: 'task.filter.done',
        length: getAllDoneGoalTasksLength(goalId),
        active: false,
        action: () => getAllDoneGoalTasks(goalId),
      },
    ])

    const activeOption = (index) => {
      options.value.forEach((opt) => {
        opt.active = false
      })
      options.value[index].active = true
      options.value[index].action()
    }

    return {
      options,
      activeOption,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
