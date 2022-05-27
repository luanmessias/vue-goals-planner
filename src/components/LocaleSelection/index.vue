<template>
  <div class="locales">
    <LocaleFlag
      :key="`locale-${i}`"
      v-for="(locale, i) in $i18n.availableLocales"
      :class="['locales__item', `locales__item--${locale}`]"
      :flag="locale"
      @click="$i18n.locale = locale"
    />
  </div>
</template>

<script>
import LocaleFlag from '@/components/LocaleFlag'
export default {
  name: 'LocaleSelection',
  components: {
    LocaleFlag,
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
