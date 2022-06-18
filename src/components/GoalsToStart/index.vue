<template>
  <section class="goals">
    <header class="goals__header">
      <h1 v-text="$t('goals.to.start.title')" />
      <span class="goals__length" v-text="goalsLength" />
    </header>
    <Carousel class="goals__carousel" :items-to-show="2.6" :wrap-around="false">
      <Slide v-for="(goal, index) in goals" :key="index">
        <div
          style="width: 110px; height: 110px; background-color: #ffe5c7"
          class="carousel__item"
        >
          {{ goal.title }}
        </div>
      </Slide>
    </Carousel>
  </section>
</template>

<script>
import { Carousel, Slide } from 'vue3-carousel'
import { useGoalStore } from '@/store/goals'
import { storeToRefs } from 'pinia'
export default {
  name: 'GoalsToStart',
  components: {
    Carousel,
    Slide,
  },
  props: {
    goalsLength: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    const { goals } = storeToRefs(useGoalStore())

    return { goals }
  },
}
</script>

<style lang="scss" scoped>
@import 'vue3-carousel/dist/carousel.css';
@import './styles';
</style>
