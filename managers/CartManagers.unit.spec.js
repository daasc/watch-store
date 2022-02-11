const CartManagers = require('./CartManagers.js')

describe('CartManagers', () => {
  let server
  let cartManagers
  beforeEach(() => {
    cartManagers = new CartManagers()
    server = require('@/miragejs/server').makeServer({ environment: 'test' })
  })
  afterEach(() => {
    server.shutdown()
  })
  it('should set cart to open', () => {
    const state = cartManagers.open()
    expect(state.open).toBe(true)
  })
  it('should set cart to closed', () => {
    const state = cartManagers.close()
    expect(state.open).toBe(false)
  })
  it('should add product to the cart only once', () => {
    const product = server.create('product')
    cartManagers.addProduct(product)
    cartManagers.addProduct(product)

    const state = cartManagers.addProduct(product)
    expect(state.items).toHaveLength(1)
  })
  it('should remove product from the cart', () => {
    const product = server.create('product')
    cartManagers.addProduct(product)

    const state = cartManagers.removeProduct(product.id)
    expect(state.items).toHaveLength(0)
  })
  it('should clear product', () => {
    const product = server.create('product')
    cartManagers.addProduct(product)

    const state = cartManagers.clearProduct()
    expect(state.items).toHaveLength(0)
  })
  it('should clear cart', () => {
    const product = server.create('product')
    cartManagers.addProduct(product)
    cartManagers.open()

    const state = cartManagers.clearCart()
    expect(state.items).toHaveLength(0)
    expect(state.open).toBe(false)
  })
  it('should return true if cart is not empty', () => {
    const product = server.create('product')
    cartManagers.addProduct(product)

    expect(cartManagers.hasProduct()).toBe(true)
  })
  it('should return true if product is already in the cart', () => {
    const product = server.create('product')
    cartManagers.addProduct(product)

    expect(cartManagers.productIsInCart(product)).toBe(true)
  })
})
