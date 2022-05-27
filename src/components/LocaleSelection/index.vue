<template>
  <h1>{{ $t('home.main.title') }}</h1>

  <div class="locales">
    <div
      :key="`locale-${i}`"
      v-for="(locale, i) in $i18n.availableLocales"
      :class="['locales__item', `locales__item--${locale}`]"
      @click="$i18n.locale = locale"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'LocaleSelection',
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
