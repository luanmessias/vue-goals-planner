import en from '@/locales/en.json'
import { VALID_GOAL } from '@/mocks/goal.mock'
import i18n from '@/plugins/i18n'
import { routes } from '@/router'
import { useGoalStore } from '@/store/goals'
import { useToggleStore } from '@/store/toggle'
import { timeStampToDate } from '@/utils/TimeStampToDate'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import Component from './'

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

describe('GoalInProgressItem Component', () => {
  let wrapper
  const pinia = createTestingPinia()
  const toggleStore = useToggleStore()
  const goalStore = useGoalStore()

  beforeEach(() => {
    i18n.global.setLocaleMessage('en', en)
    goalStore.getGoalDonePercentage = jest.fn(() => 50)
    wrapper = mount(Component, {
      global: {
        plugins: [router, pinia, i18n],
      },
      props: {
        goal: VALID_GOAL,
      },
    })
  })

  describe('DOM Behavior', () => {
    it('should render the component', () => {
      const component = wrapper.find('.goal')
      expect(component.exists()).toBe(true)
    })

    describe('Dark Theme', () => {
      beforeEach(() => {
        toggleStore.isThemeDarkActive = true
        wrapper = mount(Component, {
          global: {
            plugins: [router, pinia, i18n],
          },
          props: {
            goal: VALID_GOAL,
          },
        })
      })
      it('should render the component with dark mode', () => {
        const component = wrapper.find('.goal')
        expect(component.classes()).toContain('goal--dark')
      })
    })

    describe('Props', () => {
      it('should render the title prop', () => {
        const component = wrapper.find('.goal')
        expect(component.text()).toContain(VALID_GOAL.title)
      })

      it('should render the formatted date prop', () => {
        const formattedDate = i18n.global.d(
          timeStampToDate(VALID_GOAL.deadline.seconds)
        )
        const component = wrapper.find('.goal__date__txt')
        expect(component.text()).toContain(formattedDate)
      })

      it('should toggle goal details class when goal open button is clicked', async () => {
        const component = wrapper.find('.goal__details')
        const button = wrapper.find('.goal__options')
        await button.trigger('click')
        expect(component.classes()).toContain('goal__details--active')
      })

      it('should toggle options active class when goal options is clicked', async () => {
        const component = wrapper.find('.goal__options')
        await component.trigger('click')
        expect(component.classes()).toContain('goal__options--active')
      })

      describe('Edit goal button', () => {
        it('should render the ModeEditIcon button if goal options is active', async () => {
          const component = wrapper.find('.goal__details')
          const button = wrapper.find('.goal__options')
          await button.trigger('click')
          expect(component.find('.goal__details__edit').exists()).toBe(true)
        })

        it('should call the toggleEditGoalFormAction action when clicked', async () => {
          const spyAction = jest.spyOn(wrapper.vm, 'toggleEditGoalFormAction')
          const toggleButton = wrapper.find('.goal__options')
          await toggleButton.trigger('click')
          const editButton = wrapper.find('.goal__details__edit')
          await editButton.trigger('click')
          expect(spyAction).toHaveBeenCalled()
        })
      })

      describe('Delete goal button', () => {
        it('should render the DeleteOutlineIcon button if goal options is active', async () => {
          const component = wrapper.find('.goal__details')
          const button = wrapper.find('.goal__options')
          await button.trigger('click')
          expect(component.find('.goal__details__delete').exists()).toBe(true)
        })

        it('should call the toggleDelGoalDialog action when clicked', async () => {
          const spyAction = jest.spyOn(wrapper.vm, 'toggleDelGoalDialog')
          const toggleButton = wrapper.find('.goal__options')
          await toggleButton.trigger('click')
          const editButton = wrapper.find('.goal__details__delete')
          await editButton.trigger('click')
          expect(spyAction).toHaveBeenCalled()
        })
      })
    })
  })
})
