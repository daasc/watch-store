<template>
  <main class="my-8">
    <search @doSearch="setSearchTerm" />
    <div v-if="errorMessage === ''" class="container mx-auto px-6">
      <h3 class="text-gray-700 text-2xl font-medium">Wrist Watch</h3>
      <span class="mt-3 text-sm text-gray-500">200+ Products</span>
      <div
        class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6"
      >
        <product-card
          v-for="product in listProduct"
          :key="product.id"
          :products="product"
        />
      </div>
    </div>
    <div v-else class="text-center text-2x1">{{ errorMessage }}</div>
  </main>
</template>

<script>
import ProductCard from '@/components/ProductCard'
import Search from '@/components/Search'

export default {
  components: { ProductCard, Search },
  data() {
    return {
      products: [],
      errorMessage: '',
      searchTerm: '',
    }
  },
  computed: {
    listProduct() {
      if (this.searchTerm !== '') {
        return this.products.filter(({ title }) =>
          title.includes(this.searchTerm)
        )
      }
      return this.products
    },
  },
  async created() {
    try {
      this.products = (await this.$axios.get('/api/products')).data.products
    } catch (error) {
      this.errorMessage = 'Error the load carts'
    }
  },
  methods: {
    setSearchTerm({ term }) {
      this.searchTerm = term
    },
  },
}
</script>
