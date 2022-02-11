import Vue from 'Vue'

const initialState = {
  open: false,
  items: [],
}

class CartManagers {
  state
  constructor() {
    this.state = Vue.observable(initialState)
  }

  open() {
    this.state.open = true
    return this.state
  }

  close() {
    this.state.open = false
    return this.state
  }

  hasProduct() {
    return this.state.items.length > 0
  }

  productIsInCart(product) {
    return !!this.state.items.find(({ id }) => id === product.id)
  }

  addProduct(product) {
    if (!this.productIsInCart(product)) {
      this.state.items.push(product)
    }
    return this.state
  }

  removeProduct(id) {
    this.state.items = [
      ...this.state.items.filter((product) => product.id !== id),
    ]
    return this.state
  }

  clearProduct() {
    this.state.items = []
    return this.state
  }

  clearCart() {
    this.clearProduct()
    this.close()
    return this.state
  }
}

module.exports = CartManagers
