<template>
  <div class="task-filter">
    <div
      :class="['task-filter__opt', { 'task-filter__opt--active': opt.active }]"
      v-for="(opt, index) in options"
      :key="index"
      @click="activeOption(index)"
    >
      <span class="task-filter__opt__title" v-text="opt.title" />
      <span class="task-filter__opt__length" v-text="opt.length" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'TaskFilter',
  props: {
    goal: {
      type: String,
      default: '',
    },
  },
  setup() {
    const options = ref([
      {
        title: 'All',
        length: 5,
        active: true,
      },
      {
        title: 'To Do',
        length: 5,
        active: false,
      },
      {
        title: 'Done',
        length: 5,
        active: false,
      },
    ])

    const activeOption = (index) => {
      options.value.forEach((opt) => {
        opt.active = false
      })
      options.value[index].active = true
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
