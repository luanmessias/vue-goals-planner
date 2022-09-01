<template>
  <Teleport to="#modal">
    <CallbackMessage />
    <transition name="confirm__animate">
      <transition name="confirm__animate">
        <div
          v-if="isConfirmDialogActive"
          :class="['confirm', { 'confirm--dark': isThemeDarkActive }]"
        >
          <div
            :class="[
              'confirm__container',
              { 'confirm__container--dark': isThemeDarkActive },
            ]"
          >
            <div class="confirm__header">
              <h1 class="confirm__header__title" v-text="$t(title)" />
              <div
                v-if="showCloseButton"
                class="confirm__header__return"
                @click="toggleConfirmDialog"
              >
                <CloseIcon />
              </div>
            </div>
            <div class="confirm__content">
              <p class="confirm__content__text" v-text="$t(message)" />
            </div>
            <div class="confirm__buttons">
              <BaseButton
                :label="$t(cancelLabel)"
                @click="cancelAction"
                type="cancel"
                size="medium"
              />
              <BaseButton
                :label="$t(confirmLabel)"
                @click="confirmAction"
                type="confirm"
                size="medium"
              />
            </div>
          </div>
        </div>
      </transition>
    </transition>
  </Teleport>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useToggleStore } from '@/store/toggle'
import CloseIcon from 'icons/Close.vue'
import CallbackMessage from '@/components/CallbackMessage'
import BaseButton from '@/components/BaseButton'

export default {
  name: 'ConfirmDialog',
  components: {
    CloseIcon,
    CallbackMessage,
    BaseButton,
  },
  props: {
    showCloseButton: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    cancelLabel: {
      type: String,
      required: true,
    },
    cancelAction: {
      type: Function,
      required: true,
    },
    confirmLabel: {
      type: String,
      required: true,
    },
    confirmAction: {
      type: Function,
      required: true,
    },
  },
  setup() {
    const { isThemeDarkActive, isConfirmDialogActive } = storeToRefs(
      useToggleStore()
    )
    const { toggleConfirmDialog } = useToggleStore()

    return {
      isThemeDarkActive,
      isConfirmDialogActive,
      toggleConfirmDialog,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
