<template>
  <div class="main-header">
    <h1
      :class="[
        'main-header__title',
        { 'main-header__title--dark': isThemeDarkActive },
      ]"
      v-text="$t('home.main.title')"
    />
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useToggleStore } from '@/store/toggle'
export default {
  name: 'MainHeader',

  setup() {
    const { isThemeDarkActive } = storeToRefs(useToggleStore())

    return {
      isThemeDarkActive,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
