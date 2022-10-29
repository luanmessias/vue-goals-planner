import en from '@/locales/en.json'
import i18n from '@/plugins/i18n'
import { routes } from '@/router'
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
const toggleStore = useToggleStore()

describe('RegisterForm component', () => {
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
    toggleStore.isRegisterFormActive = true
  })

  describe('DOM Behavior', () => {
    describe('Component', () => {
      it('should render the component', () => {
        const component = wrapper.find('.register')
        expect(component.exists()).toBe(true)
      })

      it('should not render if isRegisterFormActive is false', () => {
        toggleStore.isRegisterFormActive = false
        wrapper = mount(Component, {
          global: {
            plugins: [router, pinia, i18n],
            stubs: {
              teleport: true,
            },
          },
        })
        const component = wrapper.find('.goal')
        expect(component.exists()).toBe(false)
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
        const component = wrapper.find('.register')
        expect(component.classes()).toContain('register--dark')
      })
    })

    describe('return button', () => {
      it('should render a return button', () => {
        const returnButton = wrapper.find('.register__header__return')
        expect(returnButton.exists()).toBe(true)
      })

      it('should call the toggleRegisterFormAction method when clicked', async () => {
        const returnButton = wrapper.find('.register__header__return')
        const toggleRegisterFormAction = jest.spyOn(
          wrapper.vm,
          'toggleRegisterFormAction'
        )
        await returnButton.trigger('click')
        expect(toggleRegisterFormAction).toHaveBeenCalled()
      })
    })

    describe('Form title', () => {
      it('should render a form title', () => {
        const formTitle = wrapper.find('.register__header__title')
        expect(formTitle.exists()).toBe(true)
      })

      it('should render the correct form title', () => {
        const title = i18n.global.t('register.form.title')
        const formTitle = wrapper.find('.register__header__title')
        expect(formTitle.text()).toBe(title)
      })
    })

    describe('Register Email Input', () => {
      it('should render the email input', () => {
        const emailInput = wrapper.find('.register__field--email')
        expect(emailInput.exists()).toBe(true)
      })

      it('should render the correct placeholder', () => {
        const placeholder = i18n.global.t('login.form.email')
        const emailInput = wrapper.find('input.register__field--email')
        expect(emailInput.attributes('placeholder')).toBe(placeholder)
      })

      it('should call checkEmail on input', async () => {
        const emailInput = wrapper.find('input.register__field--email')
        const checkEmail = jest.spyOn(wrapper.vm, 'checkEmail')
        await emailInput.setValue('test')
        expect(checkEmail).toHaveBeenCalled()
      })
    })

    describe('Register Password Input', () => {
      it('should render the password input', () => {
        const emailInput = wrapper.find('.register__field--password')
        expect(emailInput.exists()).toBe(true)
      })

      it('should render the correct placeholder', () => {
        const placeholder = i18n.global.t('login.form.password')
        const passwordInput = wrapper.find('input.register__field--password')
        expect(passwordInput.attributes('placeholder')).toBe(placeholder)
      })

      it('should call checkPassword on input', async () => {
        const emailInput = wrapper.find('input.register__field--password')
        const checkPassword = jest.spyOn(wrapper.vm, 'checkPassword')
        await emailInput.setValue('test')
        expect(checkPassword).toHaveBeenCalled()
      })
    })

    describe('Confirm Button', () => {
      it('should render the confirm button', () => {
        const confirmButton = wrapper.find('.register__add-button')
        expect(confirmButton.exists()).toBe(true)
      })

      it('should call the registerAction method when clicked', async () => {
        const confirmButton = wrapper.find('.register__add-button')
        const registerAction = jest.spyOn(wrapper.vm, 'registerAction')
        await confirmButton.trigger('click')
        expect(registerAction).toHaveBeenCalled()
      })
    })
  })
})
