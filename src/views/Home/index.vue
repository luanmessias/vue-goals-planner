<template>
  <div class="home-page">
    <MainHeader />
    <HomeBanner />
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader'
import HomeBanner from '@/components/HomeBanner'
export default {
  name: 'HomePage',
  components: {
    MainHeader,
    HomeBanner,
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
