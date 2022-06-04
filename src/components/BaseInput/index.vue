<template>
  <div class="form-input">
    <label class="form-input__label" v-text="label" />
    <transition name="form-input__error__animate">
      <span v-if="error" class="form-input__error" v-text="$t(error)" />
    </transition>
    <input
      v-bind="$attrs"
      :class="['form-input__field', { 'form-input__field--error': error }]"
      :placeholder="label"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
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
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
