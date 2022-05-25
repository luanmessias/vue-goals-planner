import { defineStore } from 'pinia'
import axios from 'axios'

export const useGoalStore = defineStore('goal', {
  state: () => ({
    goals: [],
  }),
  getters: {
    getGoals(state) {
      return state.goals
    },
  },
  actions: {
    async fetchGoals() {
      const data = await axios.get('http://localhost:3000/goals')
      this.goals = data.data
    },
  },
})
