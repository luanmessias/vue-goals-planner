<template>
  <div class="form-input">
    <label class="form-input__label" v-text="label" />
    <input
      v-bind="$attrs"
      class="form-input__field"
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
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
