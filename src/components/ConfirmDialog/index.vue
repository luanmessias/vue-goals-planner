<template>
  <Teleport to="#modal">
    <transition name="confirm__animate">
      <transition name="confirm__animate">
        <div
          v-if="dialog.active"
          :class="['confirm', { 'confirm--dark': isThemeDarkActive }]"
        >
          <div
            :class="[
              'confirm__container',
              { 'confirm__container--dark': isThemeDarkActive },
            ]"
          >
            <div class="confirm__header">
              <h1 class="confirm__header__title" v-text="$t(dialog.title)" />
              <div
                v-if="dialog.showCloseButton"
                class="confirm__header__return"
                @click="closeDialog"
              >
                <CloseIcon />
              </div>
            </div>
            <div class="confirm__content">
              <p class="confirm__content__text" v-text="$t(dialog.message)" />
            </div>
            <div class="confirm__buttons">
              <BaseButton
                :label="$t(dialog.cancelButton.label)"
                @click="dialog.cancelButton.action"
                type="cancel"
                size="medium"
              />
              <BaseButton
                :label="$t(dialog.confirmButton.label)"
                @click="dialog.confirmButton.action"
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
import BaseButton from '@/components/BaseButton'
import { useDialogStore } from '@/store/dialog'

export default {
  name: 'ConfirmDialog',
  components: {
    CloseIcon,
    BaseButton,
  },
  setup() {
    const { isThemeDarkActive } = storeToRefs(useToggleStore())
    const { dialog } = storeToRefs(useDialogStore())
    const { closeDialog } = useDialogStore()

    return {
      isThemeDarkActive,
      dialog,
      closeDialog,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
