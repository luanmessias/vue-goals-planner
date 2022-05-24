import { mount } from '@vue/test-utils'
import HomeBanner from './'
import i18n from '@/plugins/i18n'
import en from '@/locales/en.json'
import DATA from '../../../data/db.json'

describe('HomeBanner', () => {
  let wrapper

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(DATA['tasks']),
    })
  )

  beforeEach(() => {
    wrapper = mount(HomeBanner, {
      global: {
        plugins: [i18n],
      },
    })
  })

  describe('Banner', () => {
    it('should render the title', () => {
      const title = en['home.banner.title']
      const el = wrapper.find('.banner__info__title')
      expect(el.text()).toEqual(title)
    })

    it('should render the tasks', () => {
      const totalTasks = DATA['tasks'].length
      const totalDoneTasks = wrapper.vm.tasksDone
      const el = wrapper.find('.banner__info__tasks')
      expect(el.text()).toContain(`${totalDoneTasks}/${totalTasks}`)
    })

    it('should render the tasks msg', () => {
      const msg = en['home.banner.tasks']
      const el = wrapper.find('.banner__info__tasks')
      expect(el.text()).toContain(msg)
    })
  })
})
