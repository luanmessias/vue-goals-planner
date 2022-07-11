<template>
  <section class="goals">
    <header class="goals__header">
      <h1 v-text="$t('goals.to.start.title')" />
      <span class="goals__length" v-text="goalsLength" />
    </header>
    <Carousel class="goals__carousel" :items-to-show="2.6" :wrap-around="false">
      <Slide v-for="(goal, index) in getNewGoals" :key="index">
        <div class="goals__item">
          <strong class="goals__item__title" v-text="goal.title" />
          <div class="goals__item__date">
            <CalendarIcon />
            <span v-text="new Date(goal.deadline)" />
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
export default {
  name: 'GoalsToStart',
  components: {
    Carousel,
    Slide,
    CalendarIcon,
  },
  props: {
    goalsLength: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    const { getNewGoals } = useGoalStore()

    return { getNewGoals }
  },
}
</script>

<style lang="scss" scoped>
@import 'vue3-carousel/dist/carousel.css';
@import './styles';
</style>
