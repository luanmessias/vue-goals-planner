import en from '@/locales/en.json'
import i18n from '@/plugins/i18n'
import { routes } from '@/router'
import { useDialogStore } from '@/store/dialog'
import { useToggleStore } from '@/store/toggle'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import Component from './'

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

const createTeleportModal = () => {
  const el = document.createElement('div')
  el.setAttribute('id', 'modal')
  document.body.appendChild(el)
}

const pinia = createTestingPinia()
const dialogStore = useDialogStore()
const toggleStore = useToggleStore()

const cancelButtonCallback = jest.fn()
const confirmButtonCallback = jest.fn()

describe('ConfirmDialog component', () => {
  let wrapper

  beforeEach(() => {
    i18n.global.setLocaleMessage('en', en)
    createTeleportModal()
    wrapper = mount(Component, {
      global: {
        plugins: [router, pinia, i18n],
        stubs: {
          teleport: true,
        },
      },
    })
    dialogStore.dialog = {
      active: true,
      showCloseButton: false,
      title: 'modal.confirmation.title',
      message: 'user.dialog.logout.message',
      cancelButton: {
        label: 'user.dialog.logout.button.cancel',
        action: cancelButtonCallback,
      },
      confirmButton: {
        label: 'user.dialog.logout.button.confirm',
        action: confirmButtonCallback,
      },
    }
  })

  describe('DOM Behavior', () => {
    describe('Component', () => {
      it('should render the component', () => {
        const component = wrapper.find('.confirm')
        expect(component.exists()).toBe(true)
      })
    })

    describe('Dark Theme', () => {
      it('should render the component with dark mode', () => {
        toggleStore.isThemeDarkActive = true
        wrapper = mount(Component, {
          global: {
            plugins: [router, pinia, i18n],
            stubs: {
              teleport: true,
            },
          },
        })
        const component = wrapper.find('.confirm')
        expect(component.classes()).toContain('confirm--dark')
      })
    })

    describe('Title', () => {
      it('should render the title', () => {
        const title = wrapper.find('.confirm__header__title')
        expect(title.exists()).toBe(true)
        expect(title.text()).toBe(i18n.global.t(dialogStore.dialog.title))
      })
    })

    describe('Close Button', () => {
      beforeEach(() => {
        dialogStore.dialog = {
          ...dialogStore.dialog,
          showCloseButton: true,
        }
        wrapper = mount(Component, {
          global: {
            plugins: [router, pinia, i18n],
            stubs: {
              teleport: true,
            },
          },
        })
      })

      it('should render the close button if showCloseButton is true', () => {
        const button = wrapper.find('.confirm__header__return')
        expect(button.exists()).toBe(true)
      })

      it('should not render the close button if showCloseButton is false', () => {
        dialogStore.dialog = {
          ...dialogStore.dialog,
          showCloseButton: false,
        }
        wrapper = mount(Component, {
          global: {
            plugins: [router, pinia, i18n],
            stubs: {
              teleport: true,
            },
          },
        })
        const button = wrapper.find('.confirm__header__return')
        expect(button.exists()).toBe(false)
      })

      it('should close the dialog when clicking on the close button', async () => {
        const { closeDialog } = dialogStore
        const button = wrapper.find('.confirm__header__return')
        await button.trigger('click')
        expect(closeDialog).toHaveBeenCalled()
      })
    })

    describe('Message', () => {
      it('should render the message', () => {
        const message = wrapper.find('.confirm__content__text')
        expect(message.exists()).toBe(true)
        expect(message.text()).toBe(i18n.global.t(dialogStore.dialog.message))
      })
    })

    describe('Cancel Button', () => {
      it('should render the cancel button', () => {
        const button = wrapper.find('.confirm__buttons--cancel')
        expect(button.exists()).toBe(true)
        expect(button.text()).toBe(
          i18n.global.t(dialogStore.dialog.cancelButton.label)
        )
      })

      it('should close the dialog when clicking on the cancel button', async () => {
        const button = wrapper.find('.confirm__buttons--cancel')
        await button.trigger('click')
        expect(cancelButtonCallback).toHaveBeenCalled()
      })
    })

    describe('Confirm Button', () => {
      it('should render the confirm button', () => {
        const button = wrapper.find('.confirm__buttons--confirm')
        expect(button.exists()).toBe(true)
        expect(button.text()).toBe(
          i18n.global.t(dialogStore.dialog.confirmButton.label)
        )
      })

      it('should close the dialog when clicking on the confirm button', async () => {
        const button = wrapper.find('.confirm__buttons--confirm')
        await button.trigger('click')
        expect(confirmButtonCallback).toHaveBeenCalled()
      })
    })
  })
})
