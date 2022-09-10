<template>
  <router-link class="goal__link" :to="`/goal/${goal.id}`">
    <div class="goal">
      <div
        class="goal__percent"
        :style="{
          background: `conic-gradient(#ffb057 ${percent}%, #ededed 0deg)`,
        }"
      >
        <span class="goal__percent__value" v-text="`${percent}%`" />
      </div>
      <div class="goal__info">
        <h3 class="goal__title" v-text="goal.title" />
        <div class="goal__date">
          <CalendarIcon class="goal__date__icon" />
          <span
            class="goal__date__txt"
            v-text="$d(timeStampToDate(goal.deadline.seconds))"
          />
        </div>
      </div>
      <div class="goal__options" />
    </div>
  </router-link>
</template>

<script>
import CalendarIcon from 'icons/CalendarMonth.vue'
import { timeStampToDate } from '@/utils/TimesStampToDate'
import { useGoalStore } from '@/store/goals'

export default {
  name: 'GoalInProgressCard',
  components: {
    CalendarIcon,
  },
  props: {
    goal: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { getGoalDonePercentage } = useGoalStore()
    const percent = getGoalDonePercentage(props.goal.id)

    return { timeStampToDate, getGoalDonePercentage, percent }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
