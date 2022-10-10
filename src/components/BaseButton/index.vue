<template>
  <button
    @click="clickAction"
    :class="[
      'base-bt',
      { 'base-bt--dark': isThemeDarkActive },
      `base-bt--${type}`,
      `base-bt--${size}`,
    ]"
  >
    <slot class="base-bt__icon"></slot>
    <span v-text="label"></span>
  </button>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useToggleStore } from '@/store/toggle'
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

  setup() {
    const { isThemeDarkActive } = storeToRefs(useToggleStore())
    return {
      isThemeDarkActive,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
