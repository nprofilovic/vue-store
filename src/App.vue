<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper blue darken-4">
        <div class="brand-logo">My Vue Store</div>
        <div class="menu">
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link>
        </div>
      </div>
    </nav>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<style>
body {
  background: #e3f2fd;
  margin: 0;
}
.menu {
  float: right;
  padding-right: 10px;
}
</style>
