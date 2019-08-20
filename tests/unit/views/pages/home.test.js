import { shallowMount } from '@vue/test-utils'
import HomePage from '@/views/pages/home.vue'

describe('home.vue', () => {
  it('renders props.msg when passed', () => {
    // const msg = 'new message'
    const wrapper = shallowMount(HomePage)
    expect(wrapper.classes('homeClass')).toBe(true)
  })
})
