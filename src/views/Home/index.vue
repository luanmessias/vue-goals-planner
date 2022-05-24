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
import { goalStore } from '@/store/goals'
import { computed, onMounted } from 'vue'

export default {
  name: 'HomePage',
  components: {
    MainHeader,
    HomeBanner,
  },
  setup() {
    const store = goalStore()
    const getGoals = computed(() => {
      return store.getGoals
    })

    onMounted(() => {
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
