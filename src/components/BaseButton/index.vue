<template>
  <button @click="clickAction" class="base-bt">
    <slot class="base-bt__icon" />
    <span v-text="label" />
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
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
