<template>
  <div class="banner">
    <div class="banner__container">
      <div class="banner__info">
        <h2 class="banner__info__title" v-text="$t('home.banner.title')" />
        <p class="banner__info__tasks">
          <span>{{ getAllDoneTasksLength }} / {{ getAllTasksLength }}</span>
          {{ $t('home.banner.tasks') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { useTaskStore } from '@/store/tasks'
import { storeToRefs } from 'pinia'
export default {
  name: 'HomeBanner',
  setup() {
    const { tasks, getAllTasksLength, getAllDoneTasksLength } = storeToRefs(
      useTaskStore()
    )
    const { fetchTasks } = useTaskStore()

    fetchTasks()

    return {
      tasks,
      getAllTasksLength,
      getAllDoneTasksLength,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
