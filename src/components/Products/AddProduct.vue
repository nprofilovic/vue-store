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
  </div> 
</template>

<script>
export default {
  name: "AddProduct",
  props: [
    'addProductData',
    'onAdd'
  ]
}
</script>

<style scoped>
.products__add-product {
  align-items: center;
  display: flex;
  justify-content: space-between;
}
.style-button {
  cursor: pointer;
}
</style>