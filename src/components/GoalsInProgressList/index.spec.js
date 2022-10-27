import en from '@/locales/en.json'
import { VALID_GOALS_LIST } from '@/mocks/goalList.mock'
import i18n from '@/plugins/i18n'
import { routes } from '@/router'
import { useGoalStore } from '@/store/goals'
import { useToggleStore } from '@/store/toggle'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import Component from './'

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

describe('GoalInProgressList Component', () => {
  let wrapper
  const pinia = createTestingPinia()
  const toggleStore = useToggleStore()
  const goalStore = useGoalStore()

  beforeEach(() => {
    i18n.global.setLocaleMessage('en', en)
    goalStore.getStartedGoals = VALID_GOALS_LIST
    wrapper = mount(Component, {
      global: {
        plugins: [router, pinia, i18n],
      },
    })
  })

  describe('DOM Behavior', () => {
    it('should render the component', () => {
      const component = wrapper.find('.goals')
      expect(component.exists()).toBe(true)
    })

    describe('Dark Theme', () => {
      beforeEach(() => {
        toggleStore.isThemeDarkActive = true
        wrapper = mount(Component, {
          global: {
            plugins: [router, pinia, i18n],
          },
        })
      })
      it('should render the component with dark mode', () => {
        const component = wrapper.find('.goals')
        expect(component.classes()).toContain('goals--dark')
      })
    })

    describe('Goal List Header', () => {
      it('should render the correct title', () => {
        const title = i18n.global.t('goals.in.progress.title')
        const header = wrapper.find('.goals__header')
        expect(header.text()).toContain(title)
      })

      it('should render the goals length', () => {
        const length = String(VALID_GOALS_LIST.length)
        const header = wrapper.find('.goals__length')
        expect(header.text()).toContain(length)
      })
    })

    describe('Goal List Container', () => {
      it('should render the correct amount of goals', () => {
        const goals = wrapper.findAll('.goal')
        expect(goals.length).toBe(VALID_GOALS_LIST.length)
      })

      it('should render the empty state if no goals', () => {
        goalStore.getStartedGoals = []
        wrapper = mount(Component, {
          global: {
            plugins: [router, pinia, i18n],
          },
        })
        const emptyState = wrapper.find('.goals__empty')
        expect(emptyState.exists()).toBe(true)
        expect(emptyState.text()).toContain(
          i18n.global.t('home.goals.in.progress.empty.message')
        )
      })
    })
  })
})
