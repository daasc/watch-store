/* eslint-disable require-await */
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
    jest.clearAllMocks()
  })
  const getProducts = async (quantity = 10, overrides = []) => {
    let overridesList = []

    if (overrides.length) {
      overridesList = overrides.map((override) =>
        server.create('product', override)
      )
    }
    const products = [...server.createList('product', 10), ...overridesList]

    return products
  }

  const mountProductList = async ({
    quantity = 10,
    overrides = [],
    shouldReject = false,
  }) => {
    const products = await getProducts(quantity, overrides)
    if (shouldReject) {
      axios.get.mockReturnValue(Promise.reject(new Error('')))
    } else {
      axios.get.mockReturnValue(Promise.resolve({ data: { products } }))
    }
    const wrapper = mount(ProductList, {
      mocks: {
        $axios: axios,
      },
    })
    await Vue.nextTick()

    return { wrapper, products }
  }

  it('should mount the component', async () => {
    const { wrapper } = await mountProductList({})
    expect(wrapper.vm).toBeDefined()
  })
  it('should mount the Search component  as a child', async () => {
    const { wrapper } = await mountProductList({})
    expect(wrapper.findComponent(Search)).toBeDefined()
  })
  it('should call axios.get on component mount ', async () => {
    mount(ProductList, {
      mocks: {
        $axios: axios,
      },
    })

    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith('/api/products')
  })
  it('should mount the Search component  as a child', async () => {
    const { wrapper } = await mountProductList({})
    const card = wrapper.findAllComponents(ProductCard)
    expect(card).toHaveLength(10)
  })
  it('should display the error message when Promise rejects', async () => {
    const { wrapper } = await mountProductList({ shouldReject: true })
    expect(wrapper.text()).toContain('Error the load carts')
  })
  it('should filter the product list when a search is performed', async () => {
    const { wrapper } = await mountProductList({
      overrides: [
        {
          title: 'i love watch',
        },
        {
          title: 'i hate watch',
        },
      ],
    })
    const search = wrapper.findComponent(Search)
    await search.find('input[type="search"]').setValue('watch')
    await search.find('form').trigger('submit')

    const cards = wrapper.findAllComponents(ProductCard)
    expect(wrapper.vm.searchTerm).toEqual('watch')
    expect(cards).toHaveLength(2)
  })

  it('should clean filter and return all products', async () => {
    const { wrapper } = await mountProductList({
      overrides: [
        {
          title: 'i love watch',
        },
      ],
    })

    const search = wrapper.findComponent(Search)
    await search.find('input[type="search"]').setValue('watch')
    await search.find('form').trigger('submit')
    await search.find('input[type="search"]').setValue('')
    await search.find('form').trigger('submit')

    const cards = wrapper.findAllComponents(ProductCard)
    expect(wrapper.vm.searchTerm).toEqual('')
    expect(cards).toHaveLength(11)
  })
})
