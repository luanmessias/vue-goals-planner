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
      @click="isMenuActive = false"
      class="nav-button nav-button--close"
    >
      <CloseIcon :size="24" />
    </div>
  </transition-group>

  <Teleport to="#modal">
    <transition name="nav__animate">
      <div v-if="isMenuActive" class="nav">
        <div class="nav__container">
          <div class="nav__item">
            <TranslateIcon class="nav__item__icon" :size="24" />
          </div>
          <transition name="theme-icon">
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
          </transition>
          <div class="nav__item">
            <TranslateIcon class="nav__item__icon" :size="24" />
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
  },
  setup() {
    const { isThemeDark } = storeToRefs(useThemeStore())
    const isMenuActive = ref(false)
    const { toggleTheme } = useThemeStore()

    return {
      isMenuActive,
      isThemeDark,
      toggleTheme,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
