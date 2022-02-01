/* eslint-disable no-undef */
import { mount } from '@vue/test-utils'
import ProductCard from '@/components/ProductCard.vue'

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

  // eslint-disable-next-line require-await
  it('should emit the event addToCart with product object when button gets clicked ', async () => {
    const { wrapper, product } = mountProductCart()
    wrapper.find('button').trigger('click')

    expect(wrapper.emitted().addToCart).toBeTruthy()
    expect(wrapper.emitted().addToCart.length).toBe(1)
    expect(wrapper.emitted().addToCart[0]).toEqual([{ product }])
  })
})
