<template>
  <Teleport to="#modal">
    <transition name="confirm__animate">
      <div
        v-if="dialog.active"
        :class="['confirm', { 'confirm--dark': isThemeDarkActive }]"
      >
        <div class="confirm__container">
          <div class="confirm__header">
            <h1 class="confirm__header__title" v-text="$t(dialog.title)"></h1>
            <div
              v-if="dialog.showCloseButton"
              class="confirm__header__return"
              @click="closeDialog"
            >
              <CloseIcon />
            </div>
          </div>
          <div class="confirm__content">
            <p class="confirm__content__text" v-text="$t(dialog.message)"></p>
          </div>
          <div class="confirm__buttons">
            <BaseButton
              class="confirm__buttons--cancel"
              :label="$t(dialog.cancelButton.label)"
              @click="dialog.cancelButton.action"
              type="cancel"
              size="medium"
            />
            <BaseButton
              class="confirm__buttons--confirm"
              :label="$t(dialog.confirmButton.label)"
              @click="dialog.confirmButton.action"
              type="confirm"
              size="medium"
            />
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script>
import BaseButton from '@/components/BaseButton/index.vue'
import { useDialogStore } from '@/store/dialog'
import { useToggleStore } from '@/store/toggle'
import CloseIcon from '@icons/Close.vue'
import { storeToRefs } from 'pinia'

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
