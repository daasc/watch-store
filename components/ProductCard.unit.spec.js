/* eslint-disable no-undef */
import { mount } from '@vue/test-utils'
import ProductCard from '@/components/ProductCard.vue'
import { cartState } from '@/store'

const mountProductCart = () => {
  const product = server.create('product', {
    title: 'hello',
    price: '20.00',
    image:
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-1.2.1&auto=format&fit=crop&w=689&q=80',
  })

  return {
    wrapper: mount(ProductCard, {
      propsData: {
        products: product,
      },
    }),
    product,
  }
}

describe('ProductCard - Unit', () => {
  let server
  beforeEach(() => {
    server = require('@/miragejs/server').makeServer({ environment: 'test' })
  })
  afterEach(() => {
    server.shutdown()
  })
  it('should match snapshot', () => {
    const { wrapper } = mountProductCart()

    expect(wrapper.element).toMatchSnapshot()
  })

  it('should mount the component ', () => {
    const { wrapper } = mountProductCart()
    expect(wrapper.vm).toBeDefined()
    expect(wrapper.text()).toContain('20.00')
  })

  it('should add item to cartState on button click', async () => {
    const { wrapper } = await mountProductCart()
    wrapper.find('button').trigger('click')

    expect(cartState.items).toHaveLength(1)
  })
})
