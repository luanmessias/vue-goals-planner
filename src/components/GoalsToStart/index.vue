<template>
  <section class="goals">
    <header :class="['goals__header', { 'goals__header--dark': isThemeDark }]">
      <h1 v-text="$t('goals.to.start.title')" />
      <span class="goals__length" v-text="getNewGoals.length" />
    </header>
    <Carousel class="goals__carousel" :items-to-show="2.9" :wrap-around="false">
      <Slide v-for="(goal, index) in getNewGoals" :key="index">
        <div class="goals__item">
          <strong class="goals__item__title" v-text="cropTitle(goal.title)" />
          <div class="goals__item__date">
            <CalendarIcon class="goals__item__date__icon" />
            <span class="goals__item__date__txt" v-text="$d(goal.deadline)" />
          </div>
        </div>
      </Slide>
    </Carousel>
  </section>
</template>

<script>
import { Carousel, Slide } from 'vue3-carousel'
import { useGoalStore } from '@/store/goals'
import CalendarIcon from 'icons/CalendarMonth.vue'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/store/theme'

export default {
  name: 'GoalsToStart',
  components: {
    Carousel,
    Slide,
    CalendarIcon,
  },
  setup() {
    const { getNewGoals } = storeToRefs(useGoalStore())
    const { isThemeDark } = storeToRefs(useThemeStore())

    const cropTitle = (title) => {
      const titleLength = title.length
      const maxLength = 28
      if (titleLength > maxLength) {
        return `${title.substring(0, maxLength)}...`
      }
      return title
    }

    return { getNewGoals, cropTitle, isThemeDark }
  },
}
</script>

<style lang="scss" scoped>
@import 'vue3-carousel/dist/carousel.css';
@import './styles';
</style>
