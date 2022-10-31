import en from '@/locales/en.json'
import { VALID_TASK } from '@/mocks/task.mock'
import i18n from '@/plugins/i18n'
import { routes } from '@/router'
import { useToggleStore } from '@/store/toggle'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import Component from './'

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

describe('TaskItem Component', () => {
  let wrapper
  const pinia = createTestingPinia()
  const toggleStore = useToggleStore()

  beforeEach(() => {
    i18n.global.setLocaleMessage('en', en)
    wrapper = mount(Component, {
      global: {
        plugins: [router, pinia, i18n],
      },
      props: {
        task: VALID_TASK,
      },
    })
  })

  describe('DOM Behavior', () => {
    it('should render the component', () => {
      const component = wrapper.find('.task')
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
            task: VALID_TASK,
          },
        })
      })
      it('should render the component with dark mode', () => {
        const component = wrapper.find('.task')
        expect(component.classes()).toContain('task--dark')
      })
    })

    describe('Task Toggle', () => {
      it('should render the task toggle', () => {
        const component = wrapper.find('.task__toggle')
        expect(component.exists()).toBe(true)
      })

      it('should call the toggleTaskDone action when the task toggle is clicked', async () => {
        const component = wrapper.find('.task__toggle')
        const spy = jest.spyOn(wrapper.vm, 'toggleTaskDone')
        await component.trigger('click')
        expect(spy).toHaveBeenCalled()
      })
    })

    describe('Task Title', () => {
      it('should render the task title', () => {
        const component = wrapper.find('.task__title')
        expect(component.exists()).toBe(true)
      })

      it('should render the task title with the correct text', () => {
        const component = wrapper.find('.task__title')
        expect(component.text()).toBe(VALID_TASK.title)
      })
    })

    describe('Task options', () => {
      it('should render the task options', () => {
        const component = wrapper.find('.task__options')
        expect(component.exists()).toBe(true)
      })

      it('should set the active class after the task options are clicked', async () => {
        const component = wrapper.find('.task__options')
        await component.trigger('click')
        expect(component.classes()).toContain('task__options--active')
      })
    })

    describe('Task details', () => {
      beforeEach(async () => {
        const component = wrapper.find('.task__options')
        await component.trigger('click')
      })

      it('should render the task details', () => {
        const component = wrapper.find('.task__details')
        expect(component.exists()).toBe(true)
      })

      it('should render the task details with the correct text', () => {
        const component = wrapper.find('.task__details')
        expect(component.text()).toBe(VALID_TASK.description)
      })

      it('should call the edit action on click', async () => {
        const component = wrapper.find('.task__details__menu__icon--edit')
        const spy = jest.spyOn(wrapper.vm, 'toggleEditTaskFormAction')
        await component.trigger('click')
        expect(spy).toHaveBeenCalled()
      })

      it('should call the delete action on click', async () => {
        const component = wrapper.find('.task__details__menu__icon--delete')
        const spy = jest.spyOn(wrapper.vm, 'toggleConfirmDialogAction')
        await component.trigger('click')
        expect(spy).toHaveBeenCalled()
      })
    })
  })
})
