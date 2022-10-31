import en from '@/locales/en.json'
import { VALID_FILTERS_LIST } from '@/mocks/filters.mock'
import i18n from '@/plugins/i18n'
import { useFilterStore } from '@/store/filter'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import Component from './'

describe('TaskList Component', () => {
  let wrapper
  const pinia = createTestingPinia()
  const filterStore = useFilterStore()

  beforeEach(() => {
    i18n.global.setLocaleMessage('en', en)
    filterStore.activeFilter = VALID_FILTERS_LIST[0]
    wrapper = mount(Component, {
      global: {
        plugins: [pinia, i18n],
      },
    })
  })

  describe('DOM Behavior', () => {
    it('should render the component', () => {
      const component = wrapper.find('.task-list')
      expect(component.exists()).toBe(true)
    })

    it('should render all tasks', () => {
      const tasks = wrapper.findAll('.task')
      expect(tasks.length).toBe(VALID_FILTERS_LIST[0].data.length)
    })

    describe('Empty State', () => {
      beforeEach(() => {
        filterStore.activeFilter = {
          ...VALID_FILTERS_LIST[0],
          data: [],
        }
        wrapper = mount(Component, {
          global: {
            plugins: [pinia, i18n],
          },
        })
      })

      it('should render the empty state', () => {
        const emptyState = wrapper.find('.task-list__empty')
        expect(emptyState.exists()).toBe(true)
      })

      it('should render the correct empty state message', () => {
        const text = i18n.global.t(
          `task.list.no.tasks.${VALID_FILTERS_LIST[0].id}.message`
        )
        const emptyState = wrapper.find('.task-list__empty__text')
        expect(emptyState.text()).toBe(text)
      })
    })
  })
})
