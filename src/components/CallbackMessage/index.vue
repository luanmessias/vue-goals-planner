<template>
  <div :class="['message', { 'message--error': error }]">
    <CloseIcon v-if="error" class="message__icon message__icon--error" />
    <CheckCircleOutline v-else class="message__icon" />
  </div>
</template>

<script>
import CloseIcon from 'icons/Close.vue'
import CheckCircleOutline from 'icons/CheckCircleOutline.vue'
export default {
  name: 'CallbackMessage',
  components: {
    CloseIcon,
    CheckCircleOutline,
  },
  props: {
    error: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
