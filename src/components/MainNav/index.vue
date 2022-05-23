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
        <div class="nav__container">Xablau</div>
      </div>
    </transition>
  </Teleport>
</template>

<script>
import MenuIcon from 'icons/Menu.vue'
import CloseIcon from 'icons/Close.vue'

export default {
  name: 'MainNav',
  components: {
    MenuIcon,
    CloseIcon,
  },
  data() {
    return {
      isMenuActive: false,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
