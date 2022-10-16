import en from '@/locales/en.json'
import i18n from '@/plugins/i18n'
import { useToggleStore } from '@/store/toggle'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import Component from './'

describe('BaseButton Component', () => {
  let wrapper
  const pinia = createTestingPinia()
  const toggleStore = useToggleStore()

  beforeEach(() => {
    i18n.global.setLocaleMessage('en', en)
    wrapper = mount(Component, {
      global: {
        plugins: [pinia, i18n],
      },
    })
  })

  describe('DOM Behavior', () => {
    it('should render the component', () => {
      const component = wrapper.find('.base-bt')
      expect(component.exists()).toBe(true)
    })

    describe('Dark Theme', () => {
      it('should render the component with dark mode', () => {
        toggleStore.isThemeDarkActive = true
        wrapper = mount(Component, {
          global: {
            plugins: [pinia, i18n],
            stubs: {
              teleport: true,
            },
          },
        })
        const component = wrapper.find('.base-bt')
        expect(component.classes()).toContain('base-bt--dark')
      })
    })

    describe('Props', () => {
      it('should render the label prop', () => {
        const label = 'test'
        wrapper = mount(Component, {
          props: {
            label,
          },
          global: {
            plugins: [pinia, i18n],
          },
        })
        const component = wrapper.find('.base-bt')
        expect(component.text()).toContain(label)
      })

      it('should call the clickAction prop', async () => {
        const clickAction = jest.fn()
        wrapper = mount(Component, {
          props: {
            clickAction,
          },
          global: {
            plugins: [pinia, i18n],
          },
        })
        const component = wrapper.find('.base-bt')
        await component.trigger('click')
        expect(clickAction).toHaveBeenCalled()
      })

      it('should set a class based on type prop', () => {
        const type = 'primary'
        wrapper = mount(Component, {
          props: {
            type,
          },
          global: {
            plugins: [pinia, i18n],
          },
        })
        const component = wrapper.find('.base-bt')
        expect(component.classes()).toContain(`base-bt--${type}`)
      })

      it('should set a class based on size prop', () => {
        const size = 'small'
        wrapper = mount(Component, {
          props: {
            size,
          },
          global: {
            plugins: [pinia, i18n],
          },
        })
        const component = wrapper.find('.base-bt')
        expect(component.classes()).toContain(`base-bt--${size}`)
      })
    })
  })
})
