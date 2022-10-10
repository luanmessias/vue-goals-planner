<template>
  <Teleport to="#modal">
    <transition name="message__animate">
      <div
        v-if="message.active"
        :class="['message', { 'message--error': message.error }]"
      >
        <BlockIcon
          v-if="message.error"
          class="message__icon message__icon--error"
        />
        <CheckCircleOutline v-else class="message__icon" />
        <span class="message__text" v-text="$t(message.text)"></span>
        <div
          :class="[
            'message__loading',
            { 'message__loading--error': message.error },
          ]"
          :style="`width:${loadingPercent}%`"
        ></div>
        <div class="message__close" @click="closeMessage">
          <CloseIcon />
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script>
import CloseIcon from 'icons/Close.vue'
import CheckCircleOutline from 'icons/CheckCircleOutline.vue'
import { useMessageStore } from '@/store/message'
import { storeToRefs } from 'pinia'
import { watch, ref } from 'vue'
import BlockIcon from 'icons/BlockHelper.vue'

export default {
  name: 'CallbackMessage',
  components: {
    CloseIcon,
    CheckCircleOutline,
    BlockIcon,
  },
  setup() {
    const { message, countdown } = storeToRefs(useMessageStore())
    let loadingPercent = ref(100)
    let messageLoading

    watch(message, () => {
      if (message.value.active && loadingPercent.value === 100) {
        messageLoading = setInterval(() => {
          loadingPercent.value -= 1

          if (loadingPercent.value <= 0 || !message.value.active) {
            clearInterval(messageLoading)
            message.value.active = false
            loadingPercent.value = 100
          }
        }, countdown.value / 100)
      }
    })

    const closeMessage = () => {
      clearInterval(messageLoading)
      message.value.active = false
      loadingPercent.value = 100
    }

    return {
      message,
      loadingPercent,
      closeMessage,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
