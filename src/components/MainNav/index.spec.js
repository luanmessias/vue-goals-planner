import en from '@/locales/en.json'
import es from '@/locales/es.json'
import ptBR from '@/locales/pt-BR.json'
import i18n from '@/plugins/i18n'
import { routes } from '@/router'
import { useToggleStore } from '@/store/toggle'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import Component from './'

jest.mock('firebase/auth', () => {
  return {
    getAuth: jest.fn(),
    onAuthStateChanged: jest.fn((auth, callback) => {
      callback({ uid: '123' })
    }),
  }
})

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

describe('MainNav Component', () => {
  let wrapper
  const pinia = createTestingPinia()
  const toggleStore = useToggleStore()

  beforeEach(() => {
    i18n.global.setLocaleMessage('en', en)
    i18n.global.setLocaleMessage('es', es)
    i18n.global.setLocaleMessage('pt-BR', ptBR)
    wrapper = mount(Component, {
      global: {
        plugins: [pinia, router, i18n],
        stubs: {
          teleport: true,
        },
      },
    })
  })

  describe('DOM Behavior', () => {
    describe('Nav button', () => {
      it('should render the button component', () => {
        const button = wrapper.find('.nav-button')
        expect(button.exists()).toBe(true)
      })

      it('should show the menu when click on the button', async () => {
        const button = wrapper.find('.nav-button')
        await button.trigger('click')
        const menu = wrapper.find('.nav')
        expect(menu.exists()).toBe(true)
      })

      it('should show the close button when click on the button', async () => {
        const button = wrapper.find('.nav-button')
        await button.trigger('click')
        const closeButton = wrapper.find('.nav-button--close')
        expect(closeButton.exists()).toBe(true)
      })

      it('should hide the menu when click on the close button', async () => {
        const button = wrapper.find('.nav-button')
        await button.trigger('click')
        const closeButton = wrapper.find('.nav-button--close')
        await closeButton.trigger('click')
        const menu = wrapper.find('.nav')
        expect(menu.exists()).toBe(false)
      })
    })

    describe('Nav Overlay', () => {
      it('should render the overlay component', async () => {
        const button = wrapper.find('.nav-button')
        await button.trigger('click')
        const overlay = wrapper.find('.nav__overlay')
        expect(overlay.exists()).toBe(true)
      })

      it('should hide the menu when click on the overlay', async () => {
        const button = wrapper.find('.nav-button')
        await button.trigger('click')
        const overlay = wrapper.find('.nav__overlay')
        await overlay.trigger('click')
        const menu = wrapper.find('.nav')
        expect(menu.exists()).toBe(false)
      })
    })

    describe('Nav menu', () => {
      beforeEach(async () => {
        const button = wrapper.find('.nav-button')
        await button.trigger('click')
      })

      it('should render the menu component', () => {
        const menu = wrapper.find('.nav')
        expect(menu.exists()).toBe(true)
      })

      describe('toggle theme button', () => {
        it('should render the toggle theme button', () => {
          const toggleThemeButton = wrapper.find('.nav__item--theme')
          expect(toggleThemeButton.exists()).toBe(true)
        })

        it('should render the lightOnIcon icon', () => {
          const lightOnIcon = wrapper.find('.nav__item__icon--light-on')
          expect(lightOnIcon.exists()).toBe(true)
        })

        it('should render the lightOffIcon icon after click', async () => {
          i18n.global.setLocaleMessage('en', en)
          toggleStore.isThemeDarkActive = true
          wrapper = mount(Component, {
            global: {
              plugins: [pinia, router, i18n],
              stubs: {
                teleport: true,
              },
            },
          })
          const button = wrapper.find('.nav-button')
          await button.trigger('click')
          const lightOffIcon = wrapper.find('.nav__item__icon--light-off')
          expect(lightOffIcon.exists()).toBe(true)
        })

        it('should call the toggleTheme method after click', async () => {
          const toggleThemeButton = wrapper.find('.nav__item--theme')
          const toggleThemeSpy = jest.spyOn(toggleStore, 'toggleTheme')
          await toggleThemeButton.trigger('click')
          expect(toggleThemeSpy).toHaveBeenCalled()
        })
      })

      describe('toggle language button', () => {
        it('should render the toggle language button', () => {
          const toggleLanguageButton = wrapper.find('.nav__item--locale')
          expect(toggleLanguageButton.exists()).toBe(true)
        })

        it('should call the toggleLanguage method after click', async () => {
          const toggleLanguageButton = wrapper.find('.nav__item--locale')
          await toggleLanguageButton.trigger('click')
          expect(toggleLanguageButton.classes()).toContain('nav__item--active')
        })

        it('should set the locale prop to LocaleFlag component', () => {
          const localeFlag = wrapper.findComponent({ name: 'LocaleFlag' })
          expect(localeFlag.props('flag')).toBe('en')
        })

        it('should show the locale options after click', async () => {
          const toggleLanguageButton = wrapper.find('.nav__item--locale')
          await toggleLanguageButton.trigger('click')
          const localeOptions = wrapper.find('.nav__locales')
          expect(localeOptions.exists()).toBe(true)
        })

        it('should change flag prop to LocaleFlag component after click', async () => {
          const toggleLanguageButton = wrapper.find('.nav__item--locale')
          await toggleLanguageButton.trigger('click')
          const localeOption = wrapper.find('.locale-flag--pt-BR')
          await localeOption.trigger('click')
          const localeFlag = wrapper.findComponent({ name: 'LocaleFlag' })
          expect(localeFlag.props('flag')).toBe('pt-BR')
        })
      })

      describe('logout option', () => {
        it('should render the logout option', () => {
          jest.mock('firebase/auth', () => {
            return {
              getAuth: jest.fn(),
              onAuthStateChanged: jest.fn((auth, callback) => {
                callback({ uid: '123' })
              }),
            }
          })

          const logoutOption = wrapper.find('.nav__item--logout')
          expect(logoutOption.exists()).toBe(true)
        })

        it('should call the toggleLogoutDialog method after click', async () => {
          const logoutOption = wrapper.find('.nav__item--logout')
          const toggleLogoutDialogSpy = jest.spyOn(
            wrapper.vm,
            'toggleLogoutDialog'
          )
          await logoutOption.trigger('click')
          expect(toggleLogoutDialogSpy).toHaveBeenCalled()
        })
      })
    })
  })
})
