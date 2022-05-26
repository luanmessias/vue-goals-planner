import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isThemeDark: false,
  }),
  actions: {
    toggleTheme() {
      this.isThemeDark = !this.isThemeDark
    },
  },
})
