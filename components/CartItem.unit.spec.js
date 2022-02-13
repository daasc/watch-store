/* eslint-disable no-undef */
import { mount } from '@vue/test-utils'
import CartItem from '@/components/CartItem'
import { CartManagers } from '@/managers/CartManagers'
const mountCartItem = () => {
  const product = server.create('product', {
    title: 'watch',
    price: '20,00',
  })
  const cartManagers = new CartManagers()
  const wrapper = mount(CartItem, {
    propsData: {
      product,
    },
    mocks: {
      $cart: cartManagers,
    },
  })

  return { wrapper, product, cartManagers }
}

describe('CartItem', () => {
  let server
  beforeEach(() => {
    server = require('@/miragejs/server').makeServer({ environment: 'test' })
  })
  afterEach(() => {
    server.shutdown()
  })
  it('should mount the component', async () => {
    const { wrapper } = await mountCartItem()
    expect(wrapper.vm).toBeDefined()
  })
  it('should display product info', async () => {
    const {
      wrapper,
      product: { title, price },
    } = await mountCartItem()
    const content = wrapper.text()
    expect(content).toContain(title)
    expect(content).toContain(price)
  })
  it('should display quantity 1 when product is first displayed ', async () => {
    const { wrapper } = await mountCartItem()

    const quantity = wrapper.find('[data-testid="quantity"]')

    expect(quantity.text()).toContain('1')
  })
  it('should increase quantity when + button gets clicked', async () => {
    const { wrapper } = await mountCartItem()
    const quantity = wrapper.find('[data-testid="quantity"]')
    const button = wrapper.find('[data-testid="+"]')

    await button.trigger('click')
    expect(quantity.text()).toContain('2')
    await button.trigger('click')
    expect(quantity.text()).toContain('3')
    await button.trigger('click')
    expect(quantity.text()).toContain('4')
  })

  it('should decrease quantity when - button gets clicked', async () => {
    const { wrapper } = await mountCartItem()
    const quantity = wrapper.find('[data-testid="quantity"]')
    const button = wrapper.find('[data-testid="-"]')

    await button.trigger('click')
    expect(quantity.text()).toContain('0')
  })

  it('should not go below zero when button - is repeatedly clicked', async () => {
    const { wrapper } = await mountCartItem()
    const quantity = wrapper.find('[data-testid="quantity"]')
    const button = wrapper.find('[data-testid="-"]')

    await button.trigger('click')
    await button.trigger('click')

    expect(quantity.text()).toContain('0')
  })

  it('should display a button to remove item from cart', () => {
    const { wrapper } = mountCartItem()
    const button = wrapper.find('[data-testid="remove-button"]')

    expect(button.exists()).toBe(true)
  })
  it('should call cart manager removeProduct() when button gets clicked', async () => {
    const { wrapper, product, cartManagers } = mountCartItem()
    const spy = jest.spyOn(cartManagers, 'removeProduct')
    const button = wrapper.find('[data-testid="remove-button"]')
    await button.trigger('click')

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(product.id)
  })
})
