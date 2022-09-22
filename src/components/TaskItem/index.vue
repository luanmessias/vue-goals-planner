<template>
  <div :class="['task', { 'task--active': taskActive }]" :key="task.id">
    <div class="task__toggle" @click="toggleTaskDone(task)">
      <TaskCircleDoneIcon v-if="task.done" />
      <TaskCircleIcon v-else />
    </div>

    <span class="task__title" v-text="task.title" />

    <div
      :class="['task__options', { 'task__options--active': taskActive }]"
      @click="taskActive = !taskActive"
    >
      <div v-if="taskActive" class="task__options__close-dot" />
      <div class="task__options__dot" />
      <div v-if="taskActive" class="task__options__close-dot" />
    </div>

    <div class="task__details" v-if="taskActive">
      <div class="task__details__info" v-text="task.description" />
      <div class="task__details__menu">
        <ModeEditIcon @click="toggleEditTaskFormAction" />
        <DeleteOutlineIcon @click="toggleConfirmDialogAction" />
      </div>
    </div>
  </div>
</template>

<script>
import TaskCircleIcon from 'icons/PanoramaFisheye.vue'
import TaskCircleDoneIcon from 'icons/CheckCircle.vue'
import DeleteOutlineIcon from 'icons/DeleteOutline.vue'
import ModeEditIcon from 'icons/Pen.vue'
import { ref } from 'vue'
import { useTaskStore } from '@/store/tasks'
import { useToggleStore } from '@/store/toggle'
import { useDialogStore } from '@/store/dialog'

export default {
  name: 'TaskItem',
  components: {
    TaskCircleIcon,
    TaskCircleDoneIcon,
    DeleteOutlineIcon,
    ModeEditIcon,
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const {
      toggleTaskDone,
      setEditTask,
      setDelTask,
      clearDelTask,
      deleteTask,
    } = useTaskStore()
    const { toggleEditTaskForm } = useToggleStore()
    const { openDialog, closeDialog } = useDialogStore()
    const taskActive = ref(false)

    const toggleEditTaskFormAction = () => {
      setEditTask(props.task.id)
      toggleEditTaskForm()
    }

    const toggleConfirmDialogAction = () => {
      setDelTask(props.task.id)
      openDialog({
        showCloseButton: false,
        title: 'modal.confirmation.title',
        message: 'delete.task.confirmation.message',
        cancelButton: {
          label: 'delete.task.button.cancel',
          action: () => {
            clearDelTask()
            closeDialog()
          },
        },
        confirmButton: {
          label: 'delete.goal.button.confirm',
          action: () => {
            deleteTask()
            clearDelTask()
            closeDialog()
            taskActive.value = false
          },
        },
      })
    }

    return {
      taskActive,
      toggleTaskDone,
      toggleEditTaskFormAction,
      toggleConfirmDialogAction,
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'styles';
</style>