import en from '@/locales/en.json'
import i18n from '@/plugins/i18n'
import { useTaskStore } from '@/store/tasks'
import { useToggleStore } from '@/store/toggle'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import Component from './'

describe('BaseButton Component', () => {
  let wrapper
  const pinia = createTestingPinia()
  const toggleStore = useToggleStore()
  const taskStore = useTaskStore()
  const getAllTasksLengthMock = 50
  const getCompletedTasksLengthMock = 10

  beforeEach(() => {
    i18n.global.setLocaleMessage('en', en)
    taskStore.getAllTasksLength = getAllTasksLengthMock
    taskStore.getAllDoneTasksLength = getCompletedTasksLengthMock
    wrapper = mount(Component, {
      global: {
        plugins: [pinia, i18n],
      },
    })
  })

  describe('DOM Behavior', () => {
    it('should render the component', () => {
      const component = wrapper.find('.banner')
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
        const component = wrapper.find('.banner')
        expect(component.classes()).toContain('banner--dark')
      })
    })

    describe('Info', () => {
      it('should render the correct banner title', () => {
        const title = wrapper.find('.banner__info__title')
        expect(title.text()).toBe(i18n.global.t('home.banner.title'))
      })

      it('should render the correct done tasks information', () => {
        const info = `${getCompletedTasksLengthMock} / ${getAllTasksLengthMock} ${i18n.global.t(
          'home.banner.tasks'
        )}`
        const doneTasks = wrapper.find('.banner__info__tasks')
        expect(doneTasks.text()).toBe(info)
      })
    })
  })
})
