<template>
  <header class="header">
    <strong>!notePad</strong>
    <nav class="flexrow">
      <span class="flexrow" v-if="this.$store.state.user.admin">
        <router-link v-if="this.$store.state.user" to="/">
          <button class="icon-button" ><i class="fa-solid fa-house"></i></button>
        </router-link>
        <router-link to="/admin">
          <button class="icon-button mr-2" ><i class="fa-solid fa-gear"></i></button></router-link>
      </span>
      <router-link v-if="!this.$store.state.user" to="/login">
        <button class="button-icon" value="Entrar"
      /></router-link>
      <router-link v-else to="/login">
        <button class="icon-button" @click="logout">
          <i class="fa-solid fa-right-from-bracket"></i>
        </button>
      </router-link>
    </nav>
  </header>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
// import CommonButton from "../CommonButton.vue";
import { userKey } from "@/global.js";
export default {
  name: "Header",
  components: {
    // CommonButton,
  },
  methods: {
    showinfo() {
      console.log("localstorage: " + localStorage.getItem(userKey));
      console.log("state category: " + this.$store.state.category);
    },
    logout() {
      localStorage.removeItem(userKey);
      this.$store.commit("setUser", null);
      this.$store.commit("setEditMode", null);
      this.$router.push({ path: "/login" });
    },
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