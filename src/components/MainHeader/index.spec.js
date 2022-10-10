import { mount } from '@vue/test-utils'
import Component from './'
import i18n from '@/plugins/i18n'
import en from '@/locales/en.json'
import { createTestingPinia } from '@pinia/testing'

describe('Main Header Component', () => {
  let wrapper
  const pinia = createTestingPinia()

  beforeEach(() => {
    i18n.global.setLocaleMessage('en', en)
    wrapper = mount(Component, {
      global: {
        plugins: [pinia, i18n],
      },
    })
  })

  it('should render the component', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
