import { mount } from '@vue/test-utils'
import Vue from 'vue'
import axios from 'axios'
import Search from '@/components/Search.vue'
import ProductCard from '@/components/ProductCard.vue'
import ProductList from './'

jest.mock('axios', () => ({
  get: jest.fn(),
}))

describe('ProductList - Integration', () => {
  let server
  beforeEach(() => {
    server = require('@/miragejs/server').makeServer({ environment: 'test' })
  })
  afterEach(() => {
    server.shutdown()
  })
  it('should mount the component', () => {
    const wrapper = mount(ProductList)
    expect(wrapper.vm).toBeDefined()
  })
  it('should mount the Search component  as a child', () => {
    const wrapper = mount(ProductList)
    expect(wrapper.findComponent(Search)).toBeDefined()
  })
  it('should call axios.get on component mount ', () => {
    mount(ProductList, {
      mocks: {
        $axios: axios,
      },
    })

    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith('/api/products')
  })
  it('should mount the Search component  as a child', async () => {
    const products = server.createList('product', 10)
    axios.get.mockReturnValue(Promise.resolve({ data: { products } }))
    const wrapper = mount(ProductList, {
      mocks: {
        $axios: axios,
      },
    })
    await Vue.nextTick()
    const card = wrapper.findAllComponents(ProductCard)
    expect(card).toHaveLength(10)
  })

  it('should display the error message when Promise rejects', async () => {
    axios.get.mockReturnValue(Promise.reject(new Error('')))
    const wrapper = mount(ProductList, {
      mocks: {
        $axios: axios,
      },
    })

    await Vue.nextTick()

    expect(wrapper.text()).toContain('Error the load carts')
  })
})
