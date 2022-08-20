<template>
  <div class="main-header">
    <h1
      :class="[
        'main-header__title',
        { 'main-header__title--dark': isThemeDark },
      ]"
      v-text="$t('home.main.title')"
    />
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/store/theme'
export default {
  name: 'MainHeader',

  setup() {
    const { isThemeDark } = storeToRefs(useThemeStore())

    return {
      isThemeDark,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
