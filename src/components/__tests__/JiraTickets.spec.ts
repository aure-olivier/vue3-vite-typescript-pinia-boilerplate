import { describe, beforeEach, it, expect } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import { mount } from '@vue/test-utils'
import JiraTickets from '../JiraTickets.vue'

describe('JiraTickets', () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia())
  })
  it('renders properly', () => {
    const wrapper = mount(JiraTickets, { props: { msg: 'Jira Tickets' } })
    expect(wrapper.text()).toContain('Jira Tickets')
  })
})
