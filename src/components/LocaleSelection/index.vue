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
    <button @click="locale" v-for="(locale, i) in locales" :key="`locale-${i}`">
      {{ locale }}
    </button>
  </div>
</template>

<script>
import MenuIcon from 'vue-material-design-icons/Menu.vue'

export default {
  name: 'LocaleSelection',
  components: {
    MenuIcon,
  },
  data() {
    return { locales: ['ptBR', 'en'] }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
