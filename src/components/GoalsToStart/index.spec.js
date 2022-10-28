import en from '@/locales/en.json'
import { VALID_GOALS_LIST } from '@/mocks/goalList.mock'
import i18n from '@/plugins/i18n'
import { routes } from '@/router'
import { useGoalStore } from '@/store/goals'
import { useToggleStore } from '@/store/toggle'
import { cropString } from '@/utils/CropString'
import { timeStampToDate } from '@/utils/TimeStampToDate'
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
    goalStore.getNewGoals = VALID_GOALS_LIST
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

    describe('Empty state', () => {
      beforeEach(() => {
        goalStore.getNewGoals = []
        wrapper = mount(Component, {
          global: {
            plugins: [router, pinia, i18n],
          },
        })
      })

      it('should render the empty state if there are no goals', () => {
        const component = wrapper.find('.goals__empty')
        expect(component.exists()).toBe(true)
      })

      it('should render the correct message if there are no goals', () => {
        const component = wrapper.find('.goals__empty__content span')
        expect(component.text()).toBe(
          i18n.global.t('home.goals.to.start.empty.message')
        )
      })
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
        const title = i18n.global.t('goals.to.start.title')
        const header = wrapper.find('.goals__header')
        expect(header.text()).toContain(title)
      })

      it('should render the goals length', () => {
        const length = String(VALID_GOALS_LIST.length)
        const header = wrapper.find('.goals__length')
        expect(header.text()).toContain(length)
      })
    })

    describe('Goal Carousel', () => {
      it('should render the goal carousel', () => {
        const carousel = wrapper.find('.goals__carousel')
        expect(carousel.exists()).toBe(true)
      })

      it('should render the correct number of goals', () => {
        const goals = wrapper.findAll('.goals__item')
        expect(goals.length).toBe(VALID_GOALS_LIST.length)
      })
    })

    describe('Goal Item', () => {
      it('should render the correct title', () => {
        const title = wrapper.find('.goals__item__title')
        expect(title.text()).toContain(VALID_GOALS_LIST[0].title)
      })

      it('should render a cropped title if it is too big', () => {
        const bigTitle = 'This is a very big title that should be cropped'
        const croppedTitle = cropString(bigTitle, 28)
        const title = wrapper.findAll('.goals__item__title')[1]
        expect(title.text()).toBe(croppedTitle)
      })

      it('should render a correct deadline', () => {
        const date = timeStampToDate(VALID_GOALS_LIST[0].deadline.seconds)
        const deadline = wrapper.find('.goals__item__date__txt')
        expect(deadline.text()).toBe(i18n.global.d(date))
      })
    })
  })
})
