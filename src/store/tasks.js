import { defineStore } from 'pinia'
import axios from 'axios'

export const taskStore = defineStore('task', {
  state: () => ({
    tasks: [],
  }),
  getters: {
    getAllTasks(state) {
      return state.tasks
    },
    getAllDoneTasks(state) {
      return state.tasks.filter((task) => task.done === true)
    },
    getAllUndoneTasks(state) {
      return state.tasks.filter((task) => task.done === false)
    },
  },
  actions: {
    async fetchTasks() {
      const data = await axios.get('http://localhost:3000/tasks')
      this.tasks = data.data
    },
  },
})
