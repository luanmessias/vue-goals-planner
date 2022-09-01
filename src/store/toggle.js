import { defineStore } from 'pinia'

export const useToggleStore = defineStore('toggle', {
  state: () => ({
    isThemeDarkActive: false,
    isGoalFormActive: false,
    isTaskFormActive: false,
    isEditTaskFormActive: false,
  }),
  actions: {
    toggleTheme() {
      this.isThemeDarkActive = !this.isThemeDarkActive
    },
    toggleGoalForm() {
      this.isGoalFormActive = !this.isGoalFormActive
    },
    toggleTaskForm() {
      this.isTaskFormActive = !this.isTaskFormActive
    },
    toggleEditTaskForm() {
      this.isEditTaskFormActive = !this.isEditTaskFormActive
    },
  },
})
