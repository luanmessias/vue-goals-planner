<template>
  <div :class="['base-input', { 'base-input--dark': isThemeDarkActive }]">
    <label v-if="!hideLabel" class="base-input__label" v-text="label" />
    <textarea
      v-if="textarea"
      v-bind="$attrs"
      :class="[
        'base-input__textarea',
        { 'base-input__textarea--error': error },
      ]"
      :placeholder="label"
      :value="modelValue"
      :rows="rows"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <input
      v-else
      v-bind="$attrs"
      :class="['base-input__field', { 'base-input__field--error': error }]"
      :placeholder="label"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <transition name="base-input__error__animate">
      <span v-if="error" class="base-input__error" v-text="$t(error)" />
    </transition>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useToggleStore } from '@/store/toggle'

export default {
  name: 'BaseInput',
  props: {
    label: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
    error: {
      type: String,
      value: '',
    },
    textarea: {
      type: Boolean,
      default: false,
    },
    rows: {
      type: Number,
      default: 3,
    },
    hideLabel: {
      type: Boolean,
      default: false,
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
