import { shallowMount } from '@vue/test-utils'
import TestComponent from '@/components/TestComponent'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(TestComponent, {
      props: { msg },
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
