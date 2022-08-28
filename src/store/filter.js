import { defineStore } from 'pinia'
import { sortArrayByDate } from '@/utils/DateArraySorter'
import { useTaskStore } from './tasks'

export const useFilterStore = defineStore('filter', {
  state: () => ({
    filters: [
      {
        id: 'all',
        label: 'task.filter.all',
        active: true,
        data: [],
      },
      {
        id: 'todo',
        label: 'task.filter.to.do',
        active: false,
        data: [],
      },
      {
        id: 'done',
        label: 'task.filter.done',
        active: false,
        data: [],
      },
    ],
    error: null,
  }),
  getters: {
    activeFilter: (state) => {
      return state.filters.find((filter) => filter.active)
    },
  },
  actions: {
    getAllGoalTasks(goalId) {
      const { tasks } = useTaskStore()
      this.loading = true
      try {
        const filter = this.filters.find((filter) => filter.id === 'all')
        const filteredData = tasks.filter((task) => task.goal === goalId)
        filter.data = sortArrayByDate(filteredData, true)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    getAllToDoTasks(goalId) {
      const { tasks } = useTaskStore()
      this.loading = true
      try {
        const filter = this.filters.find((filter) => filter.id === 'todo')
        const filteredData = tasks.filter(
          (task) => task.goal === goalId && task.done === false
        )
        filter.data = sortArrayByDate(filteredData, true)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    getAllDoneTasks(goalId) {
      const { tasks } = useTaskStore()
      this.loading = true
      try {
        const filter = this.filters.find((filter) => filter.id === 'done')
        const filteredData = tasks.filter(
          (task) => task.goal === goalId && task.done === true
        )
        filter.data = sortArrayByDate(filteredData, true)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    toggleActiveFilter(filterId) {
      this.filters.forEach((filter) => {
        if (filter.id === filterId) {
          filter.active = true
        } else {
          filter.active = false
        }
      })
    },
    updateFilters(goalId) {
      this.getAllGoalTasks(goalId)
      this.getAllToDoTasks(goalId)
      this.getAllDoneTasks(goalId)
    },
  },
})
