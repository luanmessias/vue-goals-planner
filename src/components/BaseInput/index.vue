<template>
  <div :class="['base-input', { 'base-input--dark': isThemeDarkActive }]">
    <label v-if="!hideLabel" class="base-input__label" v-text="label"></label>
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
    ></textarea>
    <input
      v-else
      v-bind="$attrs"
      :class="['base-input__field', { 'base-input__field--error': error }]"
      :placeholder="label"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <transition name="base-input__error__animate">
      <span v-if="error" class="base-input__error" v-text="$t(error)"></span>
    </transition>
  </div>
</template>

<script>
import { useToggleStore } from '@/store/toggle'
import { storeToRefs } from 'pinia'

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
