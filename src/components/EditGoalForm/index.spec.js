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

describe('EditGoalForm component', () => {
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
    toggleStore.isEditGoalFormActive = true
  })

  describe('DOM Behavior', () => {
    describe('Component', () => {
      it('should render the component', () => {
        const component = wrapper.find('.goal')
        expect(component.exists()).toBe(true)
      })

      it('should not render if isEditGoalFormActive is false', () => {
        toggleStore.isEditGoalFormActive = false
        wrapper = mount(Component, {
          global: {
            plugins: [router, pinia, i18n],
            stubs: {
              teleport: true,
            },
          },
        })
        const component = wrapper.find('.goal')
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
        const component = wrapper.find('.goal')
        expect(component.classes()).toContain('goal--dark')
      })
    })

    describe('return button', () => {
      it('should render a return button', () => {
        const returnButton = wrapper.find('.goal__header__return')
        expect(returnButton.exists()).toBe(true)
      })

      it('should call the closeEditGoalForm method when clicked', async () => {
        const returnButton = wrapper.find('.goal__header__return')
        const closeEditGoalForm = jest.spyOn(wrapper.vm, 'closeEditGoalForm')
        await returnButton.trigger('click')
        expect(closeEditGoalForm).toHaveBeenCalled()
      })
    })

    describe('Form title', () => {
      it('should render a form title', () => {
        const formTitle = wrapper.find('.goal__header__title')
        expect(formTitle.exists()).toBe(true)
      })

      it('should render the correct form title', () => {
        const title = i18n.global.t('update.goal.page.title')
        const formTitle = wrapper.find('.goal__header__title')
        expect(formTitle.text()).toBe(title)
      })
    })

    describe('Goal Name Input', () => {
      it('should render the goal name input', () => {
        const goalNameInput = wrapper.find('.goal__name')
        expect(goalNameInput.exists()).toBe(true)
      })

      it('should render the correct label', () => {
        const label = i18n.global.t('add.goal.form.title')
        const goalNameInput = wrapper.find('.goal__name')
        expect(goalNameInput.text()).toContain(label)
      })

      it('should call checkTitle on input', async () => {
        const goalNameInput = wrapper.find('input.goal__name')
        const checkTitle = jest.spyOn(wrapper.vm, 'checkTitle')
        await goalNameInput.setValue('test')
        expect(checkTitle).toHaveBeenCalled()
      })
    })

    describe('Goal Deadline Input', () => {
      it('should render the goal deadline input', () => {
        const goalDeadlineInput = wrapper.find('.goal__deadline')
        expect(goalDeadlineInput.exists()).toBe(true)
      })

      it('should call checkDeadline on input', async () => {
        const goalNameInput = wrapper.find('input.dp__input')
        const checkDeadline = jest.spyOn(wrapper.vm, 'checkDeadline')
        await goalNameInput.trigger('input')
        expect(checkDeadline).toHaveBeenCalled()
      })
    })

    describe('Confirm Button', () => {
      it('should render the confirm button', () => {
        const confirmButton = wrapper.find('.goal__add-button')
        expect(confirmButton.exists()).toBe(true)
      })

      it('should call the updateGoalAction method when clicked', async () => {
        const confirmButton = wrapper.find('.goal__add-button')
        const updateGoal = jest.spyOn(wrapper.vm, 'updateGoalAction')
        await confirmButton.trigger('click')
        expect(updateGoal).toHaveBeenCalled()
      })
    })
  })
})
