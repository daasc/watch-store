import { mount } from '@vue/test-utils'
import ProductCard from '@/components/ProductCard.vue'
describe('ProductCard - Unit', () => {
  let server
  beforeEach(() => {
    server = require('@/miragejs/server').makeServer({ environment: 'test' })
  })
  afterEach(() => {
    server.shutdown()
  })
  it('should match snapshot', () => {
    const wrapper = mount(ProductCard, {
      propsData: {
        products: server.create('product', {
          title: 'hello',
          price: '20.00',
          image:
            'https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-1.2.1&auto=format&fit=crop&w=689&q=80',
        }),
      },
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should mount the component ', () => {
    const wrapper = mount(ProductCard, {
      propsData: {
        products: server.create('product', {
          title: 'hello',
          price: '20.00',
        }),
      },
    })
    expect(wrapper.vm).toBeDefined()
    console.log(wrapper.html())
    expect(wrapper.text()).toContain('20.00')
  })
})
