import { mount } from '@vue/test-utils'
import Default from '@/layouts/default'
import Cart from '@/components/Cart'
import { CartManagers } from '@/managers/CartManagers'

describe('Default', () => {
  const mountDefault = () => {
    const wrapper = mount(Default, {
      mocks: {
        $cart: new CartManagers(),
      },
      stubs: {
        Nuxt: true,
      },
    })
    return { wrapper }
  }
  it('should mount Cart', () => {
    const { wrapper } = mountDefault()
    expect(wrapper.findComponent(Cart).exists()).toBe(true)
  })
  it('should toggle Cart visibility', async () => {
    const { wrapper } = mountDefault()
    const toggle = wrapper.find('[data-testid="toggle-button"]')

    await toggle.trigger('click')
    expect(wrapper.vm.isCartOpen).toBe(true)
    await toggle.trigger('click')
    expect(wrapper.vm.isCartOpen).toBe(false)
  })
})
