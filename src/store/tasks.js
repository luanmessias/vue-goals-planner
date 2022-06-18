import { defineStore } from 'pinia'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
    task: null,
    loading: false,
    error: null,
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
      this.tasks = []
      this.loading = true
      try {
        this.tasks = await fetch(`${process.env.VUE_APP_API_HOST}/tasks`).then(
          (response) => response.json()
        )
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async fetchTask(id) {
      this.task = []
      this.loading = true
      try {
        this.task = await fetch(
          `${process.env.VUE_APP_API_HOST}/tasks/${id}`
        ).then((response) => response.json())
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    toggleTaskStatus(taskId) {
      this.tasks.find((t) => {
        if (t.id === taskId) {
          t.done = !t.done

          fetch(`${process.env.VUE_APP_API_HOST}/tasks/${taskId}`, {
            method: 'PATCH',
            body: JSON.stringify({
              done: t.done,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
        }
      })
    },
  },
})
