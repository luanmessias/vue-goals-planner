<template>
  <div class="test-component">
    <h1>Hello Vue</h1>
    <MenuIcon />
  </div>
</template>

<script>
import MenuIcon from 'vue-material-design-icons/Menu.vue'

export default {
  name: 'TestComponent',
  components: {
    MenuIcon,
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
