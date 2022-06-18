<template>
  <div class="loading">
    <LoadingIcon class="loading__svg" />
  </div>
</template>

<script>
import LoadingIcon from './img/LoadingIcon'
export default {
  name: 'LoadingScreen',
  components: {
    LoadingIcon,
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
