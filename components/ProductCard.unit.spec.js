import { mount } from '@vue/test-utils'
import ProductCard from '@/components/ProductCard.vue'
describe('ProductCard - Unit', () => {
  it('should mount the component ', () => {
    const wrapper = mount(ProductCard, {
      propsData: {
        products: {},
      },
    })
    expect(wrapper.vm).toBeDefined()
  })
})
