<template>
  <div>
    <AddProduct v-bind="{addProductData, onAdd}" />
    <ProductList v-bind="{editId, editProductData, onCancel, onDelete, onEdit, onEditSubmit, sortedProducts}" />
  </div>
</template>

<script>
import db from '@/db'
import AddProduct from './AddProduct.vue'
import ProductList from './ProductList.vue'
export default {
  name: 'Products',
  components: {
    AddProduct,
    ProductList
  },
  data() {
    return {
      products:[],
      addProductData: {
        product_id: '',
        name: '',
        price: ''
      },
      editId: '',
      editProductData: {
        product_id: '',
        name: '',
        price: ''
      }
    }
  },
  computed: {
    sortedProducts () {
      return this.products.slice().sort((a, b) => {
        return a.product_id - b.product_id
      })
    }
  },
  created() {
    this.getProducts()
  },
  methods: {
    getProducts (){
      db.collection('Products').get()
        .then(querySnapshot => {
          const products = []
          querySnapshot.forEach(doc => {
            products.push(doc.data())
          })
          this.products = products
        })
        .catch(err => console.log(err)
      )
    },
    onAdd () {
      db.collection('Products')
        .add(this.addProductData)
        .then(this.getProducts)
        .catch(err => console.log(err))
    },
    onDelete(product_id) {
      db.collection('Products')
        .where('product_id', '==', product_id).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
          doc.ref.delete().then(this.getProducts)
          })
        })
    },
    onEdit(product) {
      this.editId = product.product_id
      this.editProductData.name = product.name
      this.editProductData.price = product.price
    },
    onCancel(){
      this.editId = ''
      this.editProductData.name = ''
      this.editProductData.price = ''
    },
    onEditSubmit () {
      db.collection('Products')
        .where('product_id', '==', this.editId).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.set({
              product_id: this.editId,
              name: this.editProductData.name,
              price: this.editProductData.price
            }).then(this.getProducts)
          })
          this.onCancel()
        })
    }
  }
}
</script>

<style scoped>
.product__list-item {
  align-items: center;
  display: flex;
  justify-content: space-between;
  
}
.style-button {
  cursor: pointer;
}
</style>
