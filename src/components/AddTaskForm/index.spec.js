import en from '@/locales/en.json'
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

const createTeleportModal = () => {
  const el = document.createElement('div')
  el.setAttribute('id', 'modal')
  document.body.appendChild(el)
}

const pinia = createTestingPinia()
const toggleStore = useToggleStore()

describe('AddTaskForm Component', () => {
  let wrapper

  beforeEach(() => {
    i18n.global.setLocaleMessage('en', en)
    createTeleportModal()
    wrapper = mount(Component, {
      global: {
        plugins: [router, pinia, i18n],
        stubs: {
          teleport: true,
        },
      },
    })
    toggleStore.isTaskFormActive = true
  })

  describe('DOM Behavior', () => {
    describe('Component', () => {
      it('should render the component', () => {
        const component = wrapper.find('.task')
        expect(component.exists()).toBe(true)
      })

      it('should not render if isTaskFormActive is false', () => {
        toggleStore.isTaskFormActive = false
        wrapper = mount(Component, {
          global: {
            plugins: [router, pinia, i18n],
            stubs: {
              teleport: true,
            },
          },
        })
        const component = wrapper.find('.task')
        expect(component.exists()).toBe(false)
      })
    })

    describe('Dark Theme', () => {
      it('should render the component with dark mode', () => {
        toggleStore.isThemeDarkActive = true
        wrapper = mount(Component, {
          global: {
            plugins: [router, pinia, i18n],
            stubs: {
              teleport: true,
            },
          },
        })
        const component = wrapper.find('.task')
        expect(component.classes()).toContain('task--dark')
      })
    })

    describe('return button', () => {
      it('should render a return button', () => {
        const returnButton = wrapper.find('.task__header__return')
        expect(returnButton.exists()).toBe(true)
      })

      it('should call the toggleTaskFormAction method when clicked', async () => {
        const returnButton = wrapper.find('.task__header__return')
        const toggleTaskFormAction = jest.spyOn(
          wrapper.vm,
          'toggleTaskFormAction'
        )
        await returnButton.trigger('click')
        expect(toggleTaskFormAction).toHaveBeenCalled()
      })
    })

    describe('Form title', () => {
      it('should render a form title', () => {
        const formTitle = wrapper.find('.task__header__title')
        expect(formTitle.exists()).toBe(true)
      })

      it('should render the correct form title', () => {
        const title = i18n.global.t('add.task.page.title')
        const formTitle = wrapper.find('.task__header__title')
        expect(formTitle.text()).toBe(title)
      })
    })

    describe('Task Title Input', () => {
      it('should render the task title input', () => {
        const tasTitleInput = wrapper.find('input.task__field__title')
        expect(tasTitleInput.exists()).toBe(true)
      })

      it('should render the correct label', () => {
        const label = i18n.global.t('add.task.form.title')
        const goalNameInput = wrapper.find('.task__field__title')
        expect(goalNameInput.text()).toContain(label)
      })

      it('should call checkTitle on input', async () => {
        const goalNameInput = wrapper.find('input.task__field__title')
        const checkTitle = jest.spyOn(wrapper.vm, 'checkTitle')
        await goalNameInput.setValue('test')
        expect(checkTitle).toHaveBeenCalled()
      })
    })

    describe('Task Description Textarea', () => {
      it('should render the task description textarea', () => {
        const tasTitleInput = wrapper.find('textarea.task__field__description')
        expect(tasTitleInput.exists()).toBe(true)
      })

      it('should render the correct label', () => {
        const label = i18n.global.t('add.task.form.description')
        const goalNameInput = wrapper.find('.task__field__description')
        expect(goalNameInput.text()).toContain(label)
      })

      it('should call checkDescription on input', async () => {
        const goalNameInput = wrapper.find('textarea.task__field__description')
        const checkDescription = jest.spyOn(wrapper.vm, 'checkDescription')
        await goalNameInput.setValue('test')
        expect(checkDescription).toHaveBeenCalled()
      })
    })

    describe('Confirm Button', () => {
      it('should render the confirm button', () => {
        const confirmButton = wrapper.find('.task__add-button')
        expect(confirmButton.exists()).toBe(true)
      })

      it('should call the addTaskAction method when clicked', async () => {
        const confirmButton = wrapper.find('.task__add-button')
        const addGoal = jest.spyOn(wrapper.vm, 'addTaskAction')
        await confirmButton.trigger('click')
        expect(addGoal).toHaveBeenCalled()
      })
    })
  })
})
