<template>
  <div :class="['locale-flag', `locale-flag--${flag}`]" />
</template>

<script>
export default {
  name: 'LocaleFlag',
  props: {
    flag: String,
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
