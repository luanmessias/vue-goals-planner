<template>
  <button
    @click="clickAction"
    :class="['base-bt', `base-bt--${type}`, `base-bt--${size}`]"
  >
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
    type: {
      type: String,
      default: 'default',
    },
    size: {
      type: String,
      default: 'medium',
    },
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
