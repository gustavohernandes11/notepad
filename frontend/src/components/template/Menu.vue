<template>
  <aside class="menu">Menu</aside>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
export default {
  name: "menu",
};
</script>

<style>
.menu {
  grid-area: menu;
  border-right: 1px solid rgba(192, 192, 192, 0.568);
  border-bottom: 1px solid rgba(192, 192, 192, 0.568);
  padding: 15px
}
</style>