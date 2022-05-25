import { defineStore } from 'pinia'
import axios from 'axios'

export const useTaskStore = defineStore('task', {
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
    getAllTasksLength(state) {
      return state.tasks.length
    },
    getAllDoneTasksLength(state) {
      return state.tasks.filter((task) => task.done === true).length
    },
    getAllUndoneTasksLength(state) {
      return state.tasks.filter((task) => task.done === false).length
    },
  },
  actions: {
    async fetchTasks() {
      try {
        const data = await axios.get('http://localhost:3000/tasks')
        this.tasks = data.data
      } catch (error) {
        console.log(error)
      }
    },
    toggleTaskStatus(taskId) {
      const taskStatus = this.tasks.find((t) => t.id === taskId).done
      const data = {
        done: taskStatus,
      }
      axios.patch(`http://localhost:3000/tasks/${taskId}`, data)
    },
  },
})
