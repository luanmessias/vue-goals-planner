import en from '@/locales/en.json'
import i18n from '@/plugins/i18n'
import { routes } from '@/router'
import { useMessageStore } from '@/store/message'
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
const messageStore = useMessageStore()

describe('CallbackMessage component', () => {
  let wrapper

  beforeEach(() => {
    i18n.global.setLocaleMessage('en', en)
    createTeleportModal()
  })

  describe('DOM Behavior', () => {
    describe('when message type is success', () => {
      beforeEach(() => {
        wrapper = mount(Component, {
          global: {
            plugins: [router, pinia, i18n],
            stubs: {
              teleport: true,
            },
          },
        })
        messageStore.message = {
          active: true,
          text: 'add.task.form.success',
          error: false,
        }
      })
      it('should render the component', () => {
        const component = wrapper.find('.message')
        expect(component.exists()).toBe(true)
      })

      it('should not render the error icon', () => {
        const component = wrapper.find('.message__icon')
        expect(component.classes()).not.toContain('message__icon--error')
      })

      it('should render the success message', () => {
        const component = wrapper.find('.message__text')
        expect(component.text()).toContain(
          i18n.global.t('add.task.form.success')
        )
      })

      it('render the loading bar with success color', () => {
        const component = wrapper.find('.message__loading')
        expect(component.classes()).not.toContain('message__loading--error')
      })

      it('should render the close button', () => {
        const component = wrapper.find('.message__close')
        expect(component.exists()).toBe(true)
      })

      it('should close the modal when the close button is clicked', async () => {
        const component = wrapper.find('.message__close')
        await component.trigger('click')
        expect(messageStore.message.active).toBe(false)
      })
    })

    describe('when message type is error', () => {
      beforeEach(() => {
        wrapper = mount(Component, {
          global: {
            plugins: [router, pinia, i18n],
            stubs: {
              teleport: true,
            },
          },
        })
        messageStore.message = {
          active: true,
          text: 'add.task.form.error',
          error: true,
        }
      })
      it('should render the component', () => {
        const component = wrapper.find('.message')
        expect(component.exists()).toBe(true)
      })

      it('should render the error icon', () => {
        const component = wrapper.find('.message__icon')
        expect(component.classes()).toContain('message__icon--error')
      })

      it('should render the error message', () => {
        const component = wrapper.find('.message__text')
        expect(component.text()).toContain(i18n.global.t('add.task.form.error'))
      })

      it('render the loading bar with error color', () => {
        const component = wrapper.find('.message__loading')
        expect(component.classes()).toContain('message__loading--error')
      })

      it('should render the close button', () => {
        const component = wrapper.find('.message__close')
        expect(component.exists()).toBe(true)
      })

      it('should close the modal when the close button is clicked', async () => {
        const component = wrapper.find('.message__close')
        await component.trigger('click')
        expect(messageStore.message.active).toBe(false)
      })
    })
  })
})
