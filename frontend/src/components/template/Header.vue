<template>
  <header class="header">
    <strong>!notePad</strong>
    <nav class="flexrow">
      <router-link to="/"><CommonButton value="Home" /></router-link>
      <router-link to="/admin"
        ><CommonButton class="mr-2" 
         value="Administração"
      /></router-link>
      <router-link  to="/login">
        <CommonButton value="Entrar"
      /></router-link>
      <router-link to="/login">
        <CommonButton value="Sair" @click="logout"
      /></router-link>
      <CommonButton value="Show Info" @click="showinfo"
      />
    </nav>
  </header>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
import CommonButton from "../CommonButton.vue";
import { userKey } from "@/global.js";
export default {
  name: "Header",
  data() {
    return {
    };
  },
  components: {
    CommonButton,
  },
  methods: {
    showinfo(){
      console.log('localstorage: '+localStorage.getItem(userKey))
      console.log('state user: '+ this.$store.state.user.id)
      console.log(this.isLogged)
    },
    logout() {
      localStorage.removeItem(userKey);
      this.$store.commit("setUser", null);
      this.$router.push({ path: "/login" });
    },
  },
  mounted() {
    console.log(this.isLogged);
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