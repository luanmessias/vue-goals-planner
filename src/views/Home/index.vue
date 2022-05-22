<template>
  <div class="home-page">
    <TestComponent />
  </div>
</template>

<script>
import TestComponent from '@/components/TestComponent'
export default {
  name: 'HomePage',
  components: {
    TestComponent,
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
