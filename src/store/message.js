import { defineStore } from 'pinia'

export const useMessageStore = defineStore('message', {
  state: () => ({
    message: {
      active: true,
      text: '',
      error: false,
    },
    countdown: 2000,
  }),
  getters: {
    getMessage(state) {
      return state
    },
  },
  actions: {
    setMessage(data) {
      this.$state.message = data
      setTimeout(() => {
        this.clearMessage()
      }, this.$state.countdown)
    },
    clearMessage() {
      this.$state.message = {
        active: false,
        text: '',
        error: false,
      }
    },
  },
})
