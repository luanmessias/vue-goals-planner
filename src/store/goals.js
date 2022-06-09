import { defineStore } from 'pinia'

// ADD NEW GOAL
// [] - create a component to manage all state errors and show them
// [] - receive data
// [] - check if goal's title is already exists
// [] - - exists: true
// [] - - set feedback state with the error true and the message
// [] - - don't save the goal
// [] - exists: false
// [] - - update the goals[] state with the new information
// [] - - POST the goal 
// [] - - set feedback state with the error false (default) and the message

export const useTaskStore = defineStore('task', {
  state: () => ({
    goals: [],
    goal: null,
    loading: false,
    feedback: {
      error: false,
      message: '',
    }
  }),
  getters: {
    getAllGoals(state) {
      return state.goals
    },
  },
  actions: {
    async fetchGoals() {
      this.goals = []
      this.loading = true
      try {
        this.goals = await fetch('http://localhost:3000/goals').then(
          (response) => response.json()
        )
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async fetchGoal(id) {
      this.goal = []
      this.loading = true
      try {
        this.goal = await fetch(`http://localhost:3000/goals/${id}`).then(
          (response) => response.json()
        )
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async addGoal(goal) {
      const 
       try {
         this.goals.push()
       } catch (error) {
         this.error = error
       } finally {
         this.loading = false
       }
    }
  },
})
