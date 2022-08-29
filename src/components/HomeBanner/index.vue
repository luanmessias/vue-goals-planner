<template>
  <div class="banner">
    <div
      :class="[
        'banner__container',
        { 'banner__container--dark': isThemeDarkActive },
      ]"
    >
      <div class="banner__info">
        <h2
          :class="[
            'banner__info__title',
            { 'banner__info__title--dark': isThemeDarkActive },
          ]"
          v-text="$t('home.banner.title')"
        />
        <p
          :class="[
            'banner__info__tasks',
            { 'banner__info__tasks--dark': isThemeDarkActive },
          ]"
        >
          <span>{{ getAllDoneTasksLength }} / {{ getAllTasksLength }}</span>
          {{ $t('home.banner.tasks') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { useTaskStore } from '@/store/tasks'
import { useToggleStore } from '@/store/toggle'
import { storeToRefs } from 'pinia'
export default {
  name: 'HomeBanner',
  setup() {
    const { tasks, getAllTasksLength, getAllDoneTasksLength } = storeToRefs(
      useTaskStore()
    )
    const { isThemeDarkActive } = storeToRefs(useToggleStore())

    return {
      tasks,
      getAllTasksLength,
      getAllDoneTasksLength,
      isThemeDarkActive,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
