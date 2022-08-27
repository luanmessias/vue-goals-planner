<template>
  <transition-group name="task__animate">
    <div :class="['task', { 'task--active': taskActive }]">
      <div class="task__toggle">
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
          <ModeEditIcon />
          <DeleteOutlineIcon />
        </div>
      </div>
    </div>
  </transition-group>
</template>

<script>
import TaskCircleIcon from 'icons/PanoramaFisheye.vue'
import TaskCircleDoneIcon from 'icons/CheckCircle.vue'
import DeleteOutlineIcon from 'icons/DeleteOutline.vue'
import ModeEditIcon from 'icons/Pen.vue'
import { ref } from 'vue'
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
  setup() {
    const taskActive = ref(false)
    return { taskActive }
  },
}
</script>

<style lang="scss" scoped>
@import 'styles';
</style>
