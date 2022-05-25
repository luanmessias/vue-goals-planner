<template>
  <div class="banner">
    <div class="banner__container">
      <div class="banner__info">
        <h2 class="banner__info__title" v-text="$t('home.banner.title')" />
        <p class="banner__info__tasks">
          <span>{{ allDoneTasksLength }} / {{ allTasksLength }}</span>
          {{ $t('home.banner.tasks') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { useTaskStore } from '@/store/tasks'
import { computed, onMounted } from 'vue'
export default {
  name: 'HomeBanner',
  setup() {
    const store = useTaskStore()
    const allDoneTasksLength = computed(() => {
      return store.getAllDoneTasksLength
    })
    const allTasksLength = computed(() => {
      return store.getAllTasksLength
    })

    onMounted(() => {
      store.fetchTasks()
      console.log(store.tasks)
    })

    return {
      allDoneTasksLength,
      allTasksLength,
      tasks: store,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
