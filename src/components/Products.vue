<template>
  <div>
    <h3>Add Product</h3>

    <div class="card products__add-product">
      <div>
        <input v-model="addProductData.product_id" class="validate " placeholder="Id" />
      </div>
      <div>
        <input v-model="addProductData.name" class="validate" placeholder="Name" />
      </div>
      <div>
        <input v-model="addProductData.price" class="validate" placeholder="Price" />
      </div>
      <div>
        <i v-on:click="onAdd" class="material-icons medium style-button">add_circle</i>
      </div>
    </div>
    <h1>Products</h1>

    <div v-for="product in sortedProducts" :key="product.product_id" class="collection">
      <div v-if="editId === product.product_id" class="collection-item product__list-item" :class="{'yellow lighten-4': editId === product.product_id}">
        <div>{{product.product_id}}</div>
        <div>
          <input class="validate" v-model="editProductData.name" />
        </div>
        <div>
          <input class="validate" v-model="editProductData.price" />
        </div>
        <div>
          <i v-on:click="onEditSubmit(product)" class="material-icons style-button">check</i>
          <i v-on:click="onCancel" class="material-icons style-button">cancel</i>
        </div>
      </div>
      <div v-else class="collection-item product__list-item">
        <div>{{product.product_id}}</div>
        <div>{{product.name}}</div>
        <div>{{product.price}}</div>
        <div>
          <i v-on:click="onEdit(product)" class="material-icons style-button">edit</i>
          <i v-on:click="onDelete(product.product_id)" class="material-icons style-button">delete</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/db'

export default {
  name: 'Products',
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
.products__add-product {
  align-items: center;
  display: flex;
  justify-content: space-between;
}
.style-button {
  cursor: pointer;
}
</style>
