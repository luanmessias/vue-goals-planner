import { defineStore } from 'pinia'

export const useMessageStore = defineStore('message', {
  state: () => ({
    message: {
      active: false,
      text: '',
      error: false,
    },
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
      }, 2000)
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
