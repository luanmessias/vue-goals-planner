<template>
  <div class="test-component">
    <h1>Hello Vue</h1>
    <MenuIcon />
    {{ $t('home.main.title') }}

    <select v-model="$i18n.locale">
      <option
        v-for="(locale, i) in locales"
        :key="`locale-${i}`"
        :value="locale"
      >
        {{ locale }}
      </option>
    </select>
  </div>
</template>

<script>
import MenuIcon from 'vue-material-design-icons/Menu.vue'

export default {
  name: 'TestComponent',
  components: {
    MenuIcon,
  },
  data() {
    return { locales: ['pt-br', 'en'] }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
