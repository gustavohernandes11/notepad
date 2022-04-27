<template>
  <header class="header">
    <strong>!notePad</strong>
    <nav class="flexrow">
      <router-link to="/" ><CommonButton value="Home" /></router-link>
      <router-link to="/admin"><CommonButton class="mr-2" value="Administração"/></router-link>
      <router-link to="/login"> <CommonButton value="Entrar" /></router-link>
      <!-- <router-link><CommonButton value="Registre-se" /></router-link> -->
    </nav>
  </header>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
import CommonButton from "../CommonButton.vue";
export default {
  name: "Header",
  components: {
    CommonButton,
  },
};
</script>

<style>
.header {
  grid-area: header;
  border-bottom: 1px solid var(--color-border-grey);
  padding: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: var(--main-bg-color);
}
</style>