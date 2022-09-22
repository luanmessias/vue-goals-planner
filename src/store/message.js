import { defineStore } from 'pinia'

export const useMessageStore = defineStore('message', {
  state: () => ({
    message: {
      active: false,
      text: '',
      error: false,
    },
    countdown: 4000,
  }),
  getters: {
    getMessage(state) {
      return state
    },
  },
  actions: {
    setMessage(data) {
      let timer
      this.message = data
      const runTimer = () => {
        timer = window.setTimeout(() => {
          this.clearMessage()
        }, this.countdown)
      }
      runTimer()
      clearTimeout(timer)
    },
    clearMessage() {
      this.message = {
        active: false,
        text: '',
        error: false,
      }
    },
  },
})
