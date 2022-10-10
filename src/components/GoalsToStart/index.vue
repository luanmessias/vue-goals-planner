<template>
  <section :class="['goals', { 'goals--dark': isThemeDarkActive }]">
    <header class="goals__header">
      <h1 v-text="$t('goals.to.start.title')"></h1>
      <span class="goals__length" v-text="getNewGoals.length"></span>
    </header>
    <template v-if="getNewGoals.length">
      <Carousel
        class="goals__carousel"
        :items-to-show="2.9"
        :wrap-around="false"
      >
        <Slide v-for="(goal, index) in getNewGoals" :key="index">
          <router-link class="goals__item__link" :to="`/goal/${goal.id}`">
            <div class="goals__item">
              <strong
                class="goals__item__title"
                v-text="cropString(goal.title, 28)"
              ></strong>
              <div class="goals__item__date">
                <CalendarIcon class="goals__item__date__icon" />
                <span
                  class="goals__item__date__txt"
                  v-text="$d(timeStampToDate(goal.deadline.seconds))"
                ></span>
              </div>
            </div>
          </router-link>
        </Slide>
      </Carousel>
    </template>
    <div class="goals__empty" v-else>
      <div class="goals__empty__content">
        <span v-text="$t('home.goals.to.start.empty.message')"></span>
      </div>
    </div>
  </section>
</template>

<script>
import { Carousel, Slide } from 'vue3-carousel'
import { useGoalStore } from '@/store/goals'
import CalendarIcon from 'icons/CalendarMonth.vue'
import { storeToRefs } from 'pinia'
import { useToggleStore } from '@/store/toggle'
import { timeStampToDate } from '@/utils/TimesStampToDate'
import { cropString } from '@/utils/CropString'

export default {
  name: 'GoalsToStart',
  components: {
    Carousel,
    Slide,
    CalendarIcon,
  },
  setup() {
    const { getNewGoals } = storeToRefs(useGoalStore())
    const { isThemeDarkActive } = storeToRefs(useToggleStore())

    return { getNewGoals, cropString, isThemeDarkActive, timeStampToDate }
  },
}
</script>

<style lang="scss" scoped>
@import 'vue3-carousel/dist/carousel.css';
@import './styles';
</style>
