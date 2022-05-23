<template>
  <div class="main-header">
    <h1 class="main-header__title" v-text="$t('home.main.title')" />
    <MainNav />
  </div>
</template>

<script>
import MainNav from '@/components/MainNav'
export default {
  name: 'MainHeader',
  components: {
    MainNav,
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
