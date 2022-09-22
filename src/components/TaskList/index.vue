<template>
  <div class="task-list">
    <template v-for="(task, index) in activeFilter.data" :key="index">
      <TaskItem :task="task" />
    </template>
  </div>
</template>

<script>
import { useFilterStore } from '@/store/filter'
import { storeToRefs } from 'pinia'
import TaskItem from '@/components/TaskItem'

export default {
  name: 'TaskList',
  components: {
    TaskItem,
  },
  setup() {
    const { activeFilter } = storeToRefs(useFilterStore())

    return { activeFilter }
  },
}
</script>

<style lang="scss" scoped>
@import 'styles';
</style>
