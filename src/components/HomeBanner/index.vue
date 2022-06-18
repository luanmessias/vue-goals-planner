<template>
  <div class="banner">
    <div
      :class="['banner__container', { 'banner__container--dark': isThemeDark }]"
    >
      <div class="banner__info">
        <h2
          :class="[
            'banner__info__title',
            { 'banner__info__title--dark': isThemeDark },
          ]"
          v-text="$t('home.banner.title')"
        />
        <p
          :class="[
            'banner__info__tasks',
            { 'banner__info__tasks--dark': isThemeDark },
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
import { useThemeStore } from '@/store/theme'
import { storeToRefs } from 'pinia'
export default {
  name: 'HomeBanner',
  setup() {
    const { tasks, getAllTasksLength, getAllDoneTasksLength } = storeToRefs(
      useTaskStore()
    )
    const { isThemeDark } = storeToRefs(useThemeStore())

    return {
      tasks,
      getAllTasksLength,
      getAllDoneTasksLength,
      isThemeDark,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
