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
        <span class="message__text" v-text="$t(message.text)" />
        <div
          :class="[
            'message__loading',
            { 'message__loading--error': message.error },
          ]"
          :style="`width:${loadingPercent}%`"
        />
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

export default {
  name: 'CallbackMessage',
  components: {
    CloseIcon,
    CheckCircleOutline,
  },
  setup() {
    const { message, countdown } = storeToRefs(useMessageStore())
    let loadingPercent = ref(100)

    watch(message, () => {
      if (message.value.active && loadingPercent.value === 100) {
        const errorLoading = setInterval(() => {
          loadingPercent.value -= 1

          if (loadingPercent.value <= 0) {
            clearInterval(errorLoading)
            message.value.active = false
            loadingPercent.value = 100
          }
        }, countdown.value / 100)
      }
    })

    return {
      message,
      loadingPercent,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
