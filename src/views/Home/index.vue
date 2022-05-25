<template>
  <div class="home-page">
    <MainHeader />
    <HomeBanner />
    <div v-for="goal in goals" :key="goal.id">
      {{ goal.name }}
    </div>
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader'
import HomeBanner from '@/components/HomeBanner'
import { useGoalStore } from '@/store/goals'
import { computed, onBeforeMount } from 'vue'

export default {
  name: 'HomePage',
  components: {
    MainHeader,
    HomeBanner,
  },
  setup() {
    const store = useGoalStore()
    const getGoals = computed(() => {
      return store.getGoals
    })

    onBeforeMount(() => {
      store.fetchGoals()
    })

    return {
      goals: getGoals,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
