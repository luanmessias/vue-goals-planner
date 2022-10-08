<template>
  <div :class="['home-page', { 'home-page--dark': isThemeDarkActive }]">
    <MainHeader />
    <HomeBanner />
    <GoalsToStart />
    <GoalsInProgressList />
    <BaseButton
      class="home-page__button"
      :clickAction="toggleGoalForm"
      :label="$t('button.add.goal')"
    />
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader'
import HomeBanner from '@/components/HomeBanner'
import GoalsToStart from '@/components/GoalsToStart'
import { storeToRefs } from 'pinia'
import { useToggleStore } from '@/store/toggle'
import BaseButton from '@/components/BaseButton'
import GoalsInProgressList from '@/components/GoalsInProgressList'
import { useUserStore } from '@/store/user'
import { onMounted } from 'vue-demi'

export default {
  name: 'HomePage',
  components: {
    MainHeader,
    HomeBanner,
    GoalsToStart,
    BaseButton,
    GoalsInProgressList,
  },
  setup() {
    const { isThemeDarkActive } = storeToRefs(useToggleStore())
    const { toggleGoalForm } = useToggleStore()
    const { isLoggedIn } = useUserStore()

    onMounted(() => {
      isLoggedIn()
    })

    return {
      isThemeDarkActive,
      toggleGoalForm,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
