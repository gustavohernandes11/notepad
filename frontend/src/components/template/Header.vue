<template>
  <header class="header">
    <strong>!notePad</strong>
    <span>
    <p v-if="this.$store.state.user" class="username mr-2">{{ this.$store.state.user.email}}</p>
    <nav>
      <span
         v-if="this.$store.state.user !== null && this.$store.state.user.admin" 
      >
        <router-link v-if="this.$store.state.user" to="/">
          <button class="icon-button"><i class="fa-solid fa-house"></i></button>
        </router-link>

        <router-link to="/admin">
          <button class="icon-button mr-2">
            <i class="fa-solid fa-gear"></i></button
        ></router-link>
      </span>
      
      <span v-if="this.$store.state.user !== null" >
        <router-link to="/login">
          <button class="icon-button" @click="logout">
            <i class="fa-solid fa-right-from-bracket"></i>
          </button>
        </router-link>
      </span>
    </nav>
    </span>
  </header>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
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
      this.$store.commit("setCategory");

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
span, nav {
  display: flex;
  align-items: center;
  flex-direction: row;
}
.username {
  padding: 0px 15px;
  border-right: 1px solid var(--color-border-grey);

}
</style>