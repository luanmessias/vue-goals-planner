import { mount } from '@vue/test-utils'
import Component from './'
import i18n from '@/plugins/i18n'
import en from '@/locales/en.json'
import { createTestingPinia } from '@pinia/testing'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router'

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

const createTeleportModal = () => {
  const el = document.createElement('div')
  el.setAttribute('id', 'modal')
  document.body.appendChild(el)
}

describe('App component', () => {
  const pinia = createTestingPinia()
  let wrapper

  beforeEach(() => {
    i18n.global.setLocaleMessage('en', en)
    createTeleportModal()

    wrapper = mount(Component, {
      global: {
        plugins: [router, pinia, i18n],
      },
    })
  })

  afterEach(() => {
    document.body.outerHTML = ''
  })

  it('should render the component', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
