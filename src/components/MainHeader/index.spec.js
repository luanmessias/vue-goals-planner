import { mount } from '@vue/test-utils'
import Component from './'
import i18n from '@/plugins/i18n'
import en from '@/locales/en.json'

describe('Main Header Component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Component, {
      global: {
        plugins: [i18n],
      },
    })
  })

  describe('title', () => {
    it('should be rendered correctly', () => {
      const title = en['home.main.title']
      const el = wrapper.find('h1')
      expect(el.text()).toEqual(title)
    })
  })
})
