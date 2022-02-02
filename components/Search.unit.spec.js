import { mount } from '@vue/test-utils'
import Search from '@/components/Search.vue'

describe('Search unit', () => {
  it('should mount search', () => {
    const wrapper = mount(Search)
    expect(wrapper.vm).toBeDefined()
  })

  it('should emit the event doSearch when form is submitted', async () => {
    const wrapper = mount(Search)
    const term = 'term of search'

    await wrapper.find('input[type="search"]').setValue(term)
    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted().doSearch).toBeTruthy()
    expect(wrapper.emitted().doSearch.length).toBe(1)
    expect(wrapper.emitted().doSearch[0]).toEqual([{ term }])
  })
  it('should emit the event when search term is cleared', async () => {
    const wrapper = mount(Search)
    const search = wrapper.find('input[type="search"]')
    const term = 'term of search'

    await search.setValue(term)
    await search.setValue('')

    expect(wrapper.emitted().doSearch).toBeTruthy()
    expect(wrapper.emitted().doSearch.length).toBe(1)
    expect(wrapper.emitted().doSearch[0]).toEqual([{ term: '' }])
  })
})
