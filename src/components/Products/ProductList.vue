<template>
  <div>
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
          <router-link 
            :to="{
              name: 'ProductPage',
              params: {product_id: product.product_id}
            }">
            <i class="material-icons style-button">search</i>
          </router-link>  
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  props: [
    'onDelete',
    'onEdit',
    'onCancel',
    'onEditSubmit',
    'sortedProducts',
    'editId',
    'editProductData'

  ]
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
