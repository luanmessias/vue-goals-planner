<template>
  <div class="task-list">
    <template v-for="(task, index) in activeFilter.data" :key="index">
      <TaskItem :task="task" />
    </template>
    <div v-if="!activeFilter.data.length" class="task-list__empty">
      <TaskSleepingIcon size="150px" class="task-list__empty__svg" />
      <p
        class="task-list__empty__text"
        v-text="$t(`task.list.no.tasks.${activeFilter.id}.message`)"
      />
    </div>
  </div>
</template>

<script>
import { useFilterStore } from '@/store/filter'
import { storeToRefs } from 'pinia'
import TaskItem from '@/components/TaskItem'
import TaskSleepingIcon from './img/TaskSleepingIcon'

export default {
  name: 'TaskList',
  components: {
    TaskItem,
    TaskSleepingIcon,
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
