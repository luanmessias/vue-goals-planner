import en from '@/locales/en.json'
import { VALID_FILTERS_LIST } from '@/mocks/filters.mock'
import i18n from '@/plugins/i18n'
import { routes } from '@/router'
import { useFilterStore } from '@/store/filter'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import Component from './'

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

describe('TaskFilter Component', () => {
  let wrapper
  const pinia = createTestingPinia()
  const filtersStore = useFilterStore()

  beforeEach(() => {
    i18n.global.setLocaleMessage('en', en)
    filtersStore.filters = VALID_FILTERS_LIST
    wrapper = mount(Component, {
      global: {
        plugins: [router, pinia, i18n],
      },
    })
  })

  describe('DOM Behavior', () => {
    it('should render the component', () => {
      const component = wrapper.find('.task-filter')
      expect(component.exists()).toBe(true)
    })

    it('should call toggleActiveFilter when clicking on a filter', async () => {
      const toggleActiveFilter = jest.spyOn(filtersStore, 'toggleActiveFilter')
      const filter = wrapper.find('.task-filter__opt')
      await filter.trigger('click')
      expect(toggleActiveFilter).toHaveBeenCalled()
    })

    it('should add active class to the active filter', async () => {
      const filter = wrapper.find('.task-filter__opt')
      await filter.trigger('click')
      expect(filter.classes()).toContain('task-filter__opt--active')
    })

    it('should render all the options titles', () => {
      const options = wrapper.findAll('.task-filter__opt')
      expect(options.length).toBe(VALID_FILTERS_LIST.length)
      options.forEach((option, index) => {
        const title = option.find('.task-filter__opt__title').text()
        const label = i18n.global.t(VALID_FILTERS_LIST[index].label)
        expect(title).toBe(label)
      })
    })

    it('should render all the options length', () => {
      const options = wrapper.findAll('.task-filter__opt')
      options.forEach((option, index) => {
        const length = option.find('.task-filter__opt__length').text()
        const label = VALID_FILTERS_LIST[index].data.length
        expect(length).toBe(label.toString())
      })
    })
  })
})
