<template>
  <div class="task-list">
    <template v-for="(task, index) in activeFilter.data" :key="index">
      <TaskItem :task="task" />
    </template>
  </div>
  <ConfirmDialog
    title="modal.confirmation.title"
    message="delete.task.confirmation.message"
    cancelLabel="delete.task.button.cancel"
    :cancelAction="cancelDeleteTaskAction"
    confirmLabel="delete.task.button.confirm"
    :confirmAction="deleteTaskAction"
  />
</template>

<script>
import { useFilterStore } from '@/store/filter'
import { storeToRefs } from 'pinia'
import TaskItem from '@/components/TaskItem'
import ConfirmDialog from '@/components/ConfirmDialog'
import { useToggleStore } from '@/store/toggle'
import { useTaskStore } from '@/store/tasks'

export default {
  name: 'TaskList',
  components: {
    TaskItem,
    ConfirmDialog,
  },
  setup() {
    const { activeFilter } = storeToRefs(useFilterStore())
    const { toggleConfirmDialog } = useToggleStore()
    const { clearDelTask, deleteTask } = useTaskStore()

    const deleteTaskAction = () => {
      deleteTask()
      clearDelTask()
      toggleConfirmDialog()
    }

    const cancelDeleteTaskAction = () => {
      clearDelTask()
      toggleConfirmDialog()
    }

    return { activeFilter, cancelDeleteTaskAction, deleteTaskAction }
  },
}
</script>

<style lang="scss" scoped>
@import 'styles';
</style>
