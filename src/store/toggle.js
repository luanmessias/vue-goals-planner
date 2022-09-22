import { defineStore } from 'pinia'

export const useToggleStore = defineStore('toggle', {
  state: () => ({
    isThemeDarkActive: false,
    isGoalFormActive: false,
    isEditGoalFormActive: false,
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
    toggleEditGoalForm() {
      this.isEditGoalFormActive = !this.isEditGoalFormActive
    },
    toggleTaskForm() {
      this.isTaskFormActive = !this.isTaskFormActive
    },
    toggleEditTaskForm() {
      this.isEditTaskFormActive = !this.isEditTaskFormActive
    },
  },
})
