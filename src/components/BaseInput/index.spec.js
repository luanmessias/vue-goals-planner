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
      const component = wrapper.find('.base-input')
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
        const component = wrapper.find('.base-input')
        expect(component.classes()).toContain('base-input--dark')
      })
    })

    describe('Label', () => {
      it('should render the label prop', async () => {
        const label = 'test'
        await wrapper.setProps({ label })
        const component = wrapper.find('.base-input__label')
        expect(component.text()).toContain(label)
      })

      it('should hide label if hideLabel prop is true', async () => {
        const label = 'test'
        await wrapper.setProps({ label, hideLabel: true })
        const component = wrapper.find('.base-input__label')
        expect(component.exists()).toBe(false)
      })
    })

    describe('Element Type', () => {
      it('should render an input if textarea prop is false', () => {
        const component = wrapper.find('input')
        expect(component.exists()).toBe(true)
      })

      it('should render a textarea if textarea prop is true', async () => {
        await wrapper.setProps({ textarea: true })
        const component = wrapper.find('textarea')
        expect(component.exists()).toBe(true)
      })
    })

    describe('Input props', () => {
      it('should bind attributes to the input passed via $attrs', () => {
        const attrs = {
          'data-test': 'test',
        }
        wrapper = mount(Component, {
          global: {
            plugins: [pinia, i18n],
          },
          attrs,
        })
        const component = wrapper.find('input')
        expect(component.attributes()).toMatchObject(attrs)
      })

      it('should render a class error if error message prop is passed', async () => {
        await wrapper.setProps({
          error: 'add.goal.form.error',
        })
        const component = wrapper.find('.base-input__field')
        expect(component.classes()).toContain('base-input__field--error')
      })

      it('should render the label prop on placeholder', async () => {
        const label = 'test'
        await wrapper.setProps({ label })
        const component = wrapper.find('input')
        expect(component.attributes('placeholder')).toBe(label)
      })

      it('should bind the value prop to the input', async () => {
        const modelValue = 'test'
        await wrapper.setProps({ modelValue })
        const component = wrapper.find('.base-input__field')
        expect(component.element.value).toBe(modelValue)
      })

      it('should emit an input event when the input value changes', async () => {
        const modelValue = 'test'
        const component = wrapper.find('.base-input__field')
        await component.setValue(modelValue)
        expect(wrapper.emitted('update:modelValue')[0][0]).toBe(modelValue)
      })
    })

    describe('Textarea props', () => {
      beforeEach(async () => {
        await wrapper.setProps({ textarea: true })
      })

      it('should bind attributes to the input passed via $attrs', () => {
        const attrs = {
          'data-test': 'test',
        }
        wrapper = mount(Component, {
          global: {
            plugins: [pinia, i18n],
          },
          props: {
            textarea: true,
          },
          attrs,
        })
        const component = wrapper.find('textarea')
        expect(component.attributes()).toMatchObject(attrs)
      })

      it('should render a class error if error message prop is passed', async () => {
        await wrapper.setProps({
          error: 'add.goal.form.error',
        })
        const component = wrapper.find('.base-input__textarea')
        expect(component.classes()).toContain('base-input__textarea--error')
      })

      it('should render the label prop on placeholder', async () => {
        const label = 'test'
        await wrapper.setProps({ label })
        const component = wrapper.find('textarea')
        expect(component.attributes('placeholder')).toBe(label)
      })

      it('should bind the value prop to the textarea', async () => {
        const modelValue = 'test'
        await wrapper.setProps({ modelValue })
        const component = wrapper.find('.base-input__textarea')
        expect(component.element.value).toBe(modelValue)
      })

      it('should emit an input event when the textarea value changes', async () => {
        const modelValue = 'test'
        const component = wrapper.find('.base-input__textarea')
        await component.setValue(modelValue)
        expect(wrapper.emitted('update:modelValue')[0][0]).toBe(modelValue)
      })
    })

    describe('Error Message', () => {
      it('should render the error if error message prop is passed', async () => {
        const error = 'add.goal.form.error'
        await wrapper.setProps({
          error,
        })
        const component = wrapper.find('.base-input__error')
        expect(component.text()).toContain(i18n.global.t(error))
      })
    })
  })
})
