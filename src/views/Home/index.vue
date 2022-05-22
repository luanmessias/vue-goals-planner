<template>
  <div class="home-page">
    <MainHeader />
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader'
export default {
  name: 'HomePage',
  components: {
    MainHeader,
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
