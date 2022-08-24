<template>
  <div class="form-input">
    <label class="form-input__label" v-text="label" />
    <transition name="form-input__error__animate">
      <span v-if="error" class="form-input__error" v-text="$t(error)" />
    </transition>
    <textarea
      v-if="textarea"
      v-bind="$attrs"
      :class="[
        'form-input__textarea',
        { 'form-input__textarea--error': error },
      ]"
      :placeholder="label"
      :value="modelValue"
      :rows="rows"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <input
      v-else
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
    textarea: {
      type: Boolean,
      default: false,
    },
    rows: {
      type: Number,
      default: 3,
    },
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
