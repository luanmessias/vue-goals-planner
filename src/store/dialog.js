import { defineStore } from 'pinia'

export const useDialogStore = defineStore('dialog', {
  state: () => ({
    dialog: {
      active: false,
      showCloseButton: false,
      title: '',
      message: '',
      cancelButton: {
        label: '',
        action: () => {},
      },
      confirmButton: {
        label: '',
        action: () => {},
      },
    },
  }),
  actions: {
    openDialog(config) {
      this.dialog = {
        ...this.dialog,
        ...config,
        active: true,
      }
    },
    closeDialog() {
      this.dialog = {
        active: false,
        showCloseButton: false,
        title: '',
        message: '',
        cancelButton: {
          label: '',
          action: () => {},
        },
        confirmButton: {
          label: '',
          action: () => {},
        },
      }
    },
  },
})
