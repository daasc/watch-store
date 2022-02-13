import Vue from 'vue'

export default {
  install: (Vue) => {
    /* istanbul ignore next */
    Vue.prototype.$cart = new CartManagers()
  },
}

const initialState = {
  open: false,
  items: [],
}

export class CartManagers {
  state
  constructor() {
    this.state = Vue.observable(initialState)
  }

  open() {
    this.state.open = true
    return this.getState()
  }

  close() {
    this.state.open = false
    return this.getState()
  }

  getState() {
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
    return this.getState()
  }

  removeProduct(id) {
    this.state.items = [
      ...this.state.items.filter((product) => product.id !== id),
    ]
    return this.getState()
  }

  clearProduct() {
    this.state.items = []
    return this.getState()
  }

  clearCart() {
    this.clearProduct()
    this.close()
    return this.getState()
  }
}
