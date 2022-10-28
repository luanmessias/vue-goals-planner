import en from '@/locales/en.json'
import es from '@/locales/es.json'
import ptBR from '@/locales/pt-BR.json'
import i18n from '@/plugins/i18n'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import Component from './'

describe('BaseButton Component', () => {
  let wrapper
  const pinia = createTestingPinia()

  beforeEach(() => {
    i18n.global.setLocaleMessage('en', en)
    i18n.global.setLocaleMessage('es', es)
    i18n.global.setLocaleMessage('pt-BR', ptBR)

    wrapper = mount(Component, {
      global: {
        plugins: [pinia, i18n],
      },
    })
  })

  describe('DOM Behavior', () => {
    it('should render the component', () => {
      const component = wrapper.find('.locales')
      expect(component.exists()).toBe(true)
    })

    it('should update locale when click on a locale', async () => {
      const locale = wrapper.findAll('.locales__item')[2]
      await locale.trigger('click')
      expect(i18n.global.locale.value).toBe('pt-BR')
    })

    it('should render the selected locale class', () => {
      const locale = wrapper.findAll('.locales__item')[1]
      expect(locale.classes()).toContain('locales__item--es')
    })
  })
})
