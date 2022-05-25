<template>
  <div class="banner">
    <div class="banner__container">
      <div class="banner__info">
        <h2 class="banner__info__title" v-text="$t('home.banner.title')" />
        <p class="banner__info__tasks">
          <span>{{ doneTasks.length }} / {{ allTasks.length }}</span>
          {{ $t('home.banner.tasks') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { taskStore } from '@/store/tasks'
import { computed, onMounted } from 'vue'
export default {
  name: 'HomeBanner',
  setup() {
    const store = taskStore()
    const getAllDoneTasks = computed(() => {
      return store.getAllDoneTasks
    })
    const getAllTasks = computed(() => {
      return store.getAllTasks
    })
    onMounted(() => {
      store.fetchTasks()
    })

    return {
      allTasks: getAllTasks,
      doneTasks: getAllDoneTasks,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
