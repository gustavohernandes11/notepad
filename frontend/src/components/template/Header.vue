<template>
  <header class="header">
    <strong>!notePad</strong>
    <div class="flexrow">
    <CommonButton value='Administração' />
    <CommonButton value='Entrar' />
    <CommonButton value='Registre-se' />
    </div>
  </header>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
import CommonButton from "../CommonButton.vue";
export default {
  name: "header",
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
  background-color: var(--main-bg-color)
}
</style>