<template>
  <button @click="clickAction" class="add-bt">
    <span class="add-bt__plus">+</span> {{ label }}
  </button>
</template>

<script>
export default {
  name: 'AddButton',
  props: {
    label: {
      type: String,
      default: '',
    },
    clickAction: {
      type: Function,
      default: () => {},
    },
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
