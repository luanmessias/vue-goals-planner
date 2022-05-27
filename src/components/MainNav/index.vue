<template>
  <transition-group name="nav-button__animate">
    <div
      v-if="!isMenuActive"
      @click="isMenuActive = true"
      class="nav-button nav-button--open"
    >
      <MenuIcon :size="24" />
    </div>
    <div
      v-if="isMenuActive"
      @click="closeAMenu"
      class="nav-button nav-button--close"
    >
      <CloseIcon :size="24" />
    </div>
  </transition-group>

  <Teleport to="#modal">
    <transition name="nav__animate">
      <div v-if="isMenuActive" class="nav">
        <div class="nav__container">
          <div
            @click="toggleTheme"
            :class="['nav__item', { 'nav__item--active': !isThemeDark }]"
          >
            <LightOffIcon
              v-if="isThemeDark"
              class="nav__item__icon"
              :size="24"
            />
            <LightOnIcon v-else class="nav__item__icon" :size="24" />
          </div>
          <div
            @click="isLocalesActive = !isLocalesActive"
            :class="['nav__item', { 'nav__item--active': isLocalesActive }]"
          >
            <LocaleFlag class="nav__item__flag" :flag="$i18n.locale" />
            <TranslateIcon class="nav__item__icon" :size="24" />
            <transition name="nav__locales__animate">
              <LocaleSelection v-if="isLocalesActive" class="nav__locales" />
            </transition>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script>
import MenuIcon from 'icons/Menu.vue'
import CloseIcon from 'icons/Close.vue'
import TranslateIcon from 'icons/Translate.vue'
import LightOnIcon from 'icons/Brightness5.vue'
import LightOffIcon from 'icons/Brightness2.vue'
import LocaleFlag from '@/components/LocaleFlag'
import LocaleSelection from '@/components/LocaleSelection'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/store/theme'

export default {
  name: 'MainNav',
  components: {
    MenuIcon,
    CloseIcon,
    TranslateIcon,
    LightOnIcon,
    LightOffIcon,
    LocaleFlag,
    LocaleSelection,
  },
  setup() {
    const { isThemeDark } = storeToRefs(useThemeStore())
    const isMenuActive = ref(false)
    const isLocalesActive = ref(false)
    const { toggleTheme } = useThemeStore()

    const closeAMenu = () => {
      isMenuActive.value = false
      isLocalesActive.value = false
    }

    return {
      isMenuActive,
      isThemeDark,
      toggleTheme,
      isLocalesActive,
      closeAMenu,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
