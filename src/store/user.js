import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),
  getters: {
    getUser() {
      return this.user
    },
    isLoggedIn() {
      return !!this.user
    },
  },
  actions: {
    setUser(user) {
      this.user = user
    },
    logout() {
      const router = useRouter()
      this.user = null
      router.push('/login')
    },
  },
})
