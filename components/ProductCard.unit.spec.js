/* eslint-disable no-undef */
import { mount } from '@vue/test-utils'
import ProductCard from '@/components/ProductCard.vue'
import { CartManagers } from '../managers/CartManagers'

const mountProductCart = () => {
  const product = server.create('product', {
    title: 'hello',
    price: '20.00',
    image:
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-1.2.1&auto=format&fit=crop&w=689&q=80',
  })
  const cartManagers = new CartManagers()
  const wrapper = mount(ProductCard, {
    propsData: {
      products: product,
    },
    mocks: {
      $cart: cartManagers,
    },
  })

  return {
    wrapper,
    product,
    cartManagers,
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
    const { wrapper, product, cartManagers } = await mountProductCart()
    const spy1 = jest.spyOn(cartManagers, 'open')
    const spy2 = jest.spyOn(cartManagers, 'addProduct')

    wrapper.find('button').trigger('click')

    expect(spy1).toHaveBeenCalledTimes(1)
    expect(spy2).toHaveBeenCalledTimes(1)
    expect(spy2).toHaveBeenCalledWith(product)
  })
})
