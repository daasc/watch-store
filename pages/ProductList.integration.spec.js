import { mount } from '@vue/test-utils'
import Search from '@/components/Search.vue'
import ProductCard from '@/components/ProductCard.vue'

import ProductList from './'

describe('ProductList - Integration', () => {
  it('should mount the component', () => {
    const wrapper = mount(ProductList)
    expect(wrapper.vm).toBeDefined()
  })
  it('should mount the Search component  as a child', () => {
    const wrapper = mount(ProductList)
    expect(wrapper.findComponent(Search)).toBeDefined()
  })
  it('should mount the Search component  as a child', () => {
    const wrapper = mount(ProductList)
    const card = wrapper.findAllComponents(ProductCard)
    expect(card).toHaveLength(10)
  })
})
