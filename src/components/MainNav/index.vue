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
      @click="closeMenu"
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
            :class="['nav__item', { 'nav__item--active': !isThemeDarkActive }]"
          >
            <LightOffIcon
              v-if="isThemeDarkActive"
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
          <div
            v-if="isLoggedIn"
            @click="toggleLogoutDialog"
            :class="['nav__item', { 'nav__item--active': isLocalesActive }]"
          >
            <LogoutIcon class="nav__item__icon" :size="24" />
          </div>
        </div>
        <div class="nav__overlay" @click="closeMenu" />
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
import LogoutIcon from 'icons/Logout.vue'
import LocaleFlag from '@/components/LocaleFlag'
import LocaleSelection from '@/components/LocaleSelection'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useToggleStore } from '@/store/toggle'
import { useDialogStore } from '@/store/dialog'
import { useRouter } from 'vue-router'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useMessageStore } from '@/store/message'

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
    LogoutIcon,
  },
  setup() {
    const { isThemeDarkActive } = storeToRefs(useToggleStore())
    const isMenuActive = ref(false)
    const isLocalesActive = ref(false)
    const { toggleTheme } = useToggleStore()
    const { openDialog, closeDialog } = useDialogStore()
    const isLoggedIn = ref(false)
    const router = useRouter()
    const { setMessage } = useMessageStore()

    const closeMenu = () => {
      isMenuActive.value = false
      isLocalesActive.value = false
    }

    let auth
    onMounted(() => {
      auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        if (user) {
          isLoggedIn.value = true
        } else {
          isLoggedIn.value = false
        }
      })
    })

    const handleSignOut = () => {
      signOut(auth)
        .then(() => {
          router.push({ name: 'login' })
          setMessage({
            active: true,
            text: 'user.logout.success',
            error: false,
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }

    const toggleLogoutDialog = () => {
      openDialog({
        showCloseButton: false,
        title: 'modal.confirmation.title',
        message: 'user.dialog.logout.message',
        cancelButton: {
          label: 'user.dialog.logout.button.cancel',
          action: () => {
            closeDialog()
          },
        },
        confirmButton: {
          label: 'user.dialog.logout.button.confirm',
          action: () => {
            closeDialog()
            closeMenu()
            handleSignOut()
          },
        },
      })
    }

    return {
      isMenuActive,
      isThemeDarkActive,
      toggleTheme,
      isLocalesActive,
      closeMenu,
      toggleLogoutDialog,
      isLoggedIn,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
