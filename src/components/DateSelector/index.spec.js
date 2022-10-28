import en from '@/locales/en.json'
import { VALID_GOALS_LIST } from '@/mocks/goalList.mock'
import i18n from '@/plugins/i18n'
import { useGoalStore } from '@/store/goals'
import { useToggleStore } from '@/store/toggle'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import Component from './'

describe('GoalInProgressList Component', () => {
  let wrapper
  const pinia = createTestingPinia()
  const toggleStore = useToggleStore()
  const goalStore = useGoalStore()
  const startDateMock = new Date()

  beforeEach(() => {
    i18n.global.setLocaleMessage('en', en)
    goalStore.getNewGoals = VALID_GOALS_LIST
    wrapper = mount(Component, {
      global: {
        plugins: [pinia, i18n],
      },
      props: {
        startDate: startDateMock,
      },
    })
  })

  describe('DOM Behavior', () => {
    it('should render the component', () => {
      const component = wrapper.find('.date-selector')
      expect(component.exists()).toBe(true)
    })

    describe('Dark Theme', () => {
      beforeEach(() => {
        toggleStore.isThemeDarkActive = true
        wrapper = mount(Component, {
          global: {
            plugins: [pinia, i18n],
          },
        })
      })
      it('should render the component with dark mode', () => {
        const component = wrapper.find('.date-selector')
        expect(component.classes()).toContain('date-selector--dark')
      })
    })

    describe('Props', () => {
      it('should render the label when is given', async () => {
        const label = 'test'
        await wrapper.setProps({ label })
        const component = wrapper.find('.date-selector__label')
        expect(component.text()).toBe(label)
      })

      it('should render the error message when is given', async () => {
        const errorMessage = 'add.goal.deadline.error.empty'
        await wrapper.setProps({ error: errorMessage })
        const component = wrapper.find('.date-selector__error')
        expect(component.text()).toBe(i18n.global.t(errorMessage))
      })

      it('should render the start date when is given', () => {
        const input = wrapper.find('.dp__pointer')
        expect(input.element.value).toBe(i18n.global.d(startDateMock))
      })
    })
  })
})
