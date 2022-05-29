<template>
  <div class="form-input">
    <span class="form-input__label" v-text="label" />
    <input class="form-input__field" type="text" />
  </div>
</template>

<script>
export default {
  name: 'FormInput',
  props: {
    label: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
