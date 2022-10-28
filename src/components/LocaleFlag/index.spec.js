import { mount } from '@vue/test-utils'
import Component from './'

describe('BaseButton Component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Component, {})
  })

  describe('DOM Behavior', () => {
    it('should render the component', () => {
      const component = wrapper.find('.locale-flag')
      expect(component.exists()).toBe(true)
    })

    it('should render the component flag with parameter', () => {
      wrapper = mount(Component, {
        props: {
          flag: 'en',
        },
      })
      const component = wrapper.find('.locale-flag')
      expect(component.exists()).toBe(true)
      expect(component.classes()).toContain('locale-flag--en')
    })
  })
})
