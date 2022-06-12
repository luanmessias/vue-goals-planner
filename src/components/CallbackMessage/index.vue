<template>
  <Teleport to="#modal">
    <transition name="message__animate">
      <div
        v-if="message.active"
        :class="['message', { 'message--error': message.error }]"
      >
        <CloseIcon
          v-if="message.error"
          class="message__icon message__icon--error"
        />
        <CheckCircleOutline v-else class="message__icon" />
        <span class="message__text" v-text="message.text" />
      </div>
    </transition>
  </Teleport>
</template>

<script>
import CloseIcon from 'icons/Close.vue'
import CheckCircleOutline from 'icons/CheckCircleOutline.vue'
import { useMessageStore } from '@/store/message'
import { storeToRefs } from 'pinia'
export default {
  name: 'CallbackMessage',
  components: {
    CloseIcon,
    CheckCircleOutline,
  },
  setup() {
    const { message } = storeToRefs(useMessageStore())

    return {
      message,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
