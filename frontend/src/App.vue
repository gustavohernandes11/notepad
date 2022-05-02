<template>
  <div class="app">
    <Header />
    <router-view v-if="!validatingToken" />
    <div v-else class="loading"><img src="./assets/Spin-1.1s-200px.gif" alt="loading gif"></div>
  </div>
</template>
<script>
import Header from "./components/template/Header.vue";
import { userKey, baseApiUrl } from "./global";
import axios from "axios";
export default {
  components: {
    Header,
  },
  data() {
    return {
      validatingToken: true,
    };
  },
  methods: {
    async validateToken() {
      this.validatingToken = true;

      const json = localStorage.getItem(userKey);
      const userData = JSON.parse(json);
      this.$store.commit("setUser", null);

      if (!userData) {
        this.validatingToken = false;
        this.$store.commit("setUser", null);
        this.$router.push({ name: "login" });
        return
      }

      const res = await axios.post(`${baseApiUrl}/validateToken`, userData);

      if (res.data) {
        this.$store.commit("setUser", userData);
      } else {
        localStorage.removeItem(userKey);
        this.$router.push({ name: "login" });
      }

      this.validatingToken = false;

    },
  },
  created() {
    this.validateToken();
  },
};
</script>

<style>
:root {
  --main-bg-color: rgb(32, 32, 32);
  --color-border-grey: rgba(192, 192, 192, 0.568);
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#app,
.app,
body,
html {
  margin: 0px;
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  overflow-y: hidden;
}
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  box-sizing: border-box;
  border-collapse: collapse;
  color: rgb(233, 233, 233);
}
.flexrow {
  display: flex;
  flex-direction: row;
}
.flexcolumn {
  display: flex;
  flex-direction: column;
}
.flexcenter {
  display: flex;
  align-items: center;
  justify-content: center;
}
h1 {
  margin-top: 0;
  margin-bottom: 5px;
}
.app {
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 50px 1fr;
  grid-template-areas:
    "header header"
    "content content";
}
.loading {
  grid-area: content;
  display: flex;
  flex-direction: center;
  justify-content: center;
  align-items: center;
  background-color: var(--main-bg-color);
}
.loading img {
  width: 50px;
  height: 50px;
}
path {
  font-size: 50px;
  padding: 10px;
}
path:hover {
  cursor: pointer;
}
.mt-1 {
  margin-top: 10px;
}
.mt-2 {
  margin-top: 20px;
}
.mb-2 {
  margin-bottom: 20px;
}
.mr-2 {
  margin-right: 20px;
}
.ml-2 {
  margin-left: 20px;
}
.s-between {
  justify-content: space-between;
}
router-link {
  text-decoration: none;
}
.icon-button {
  height: 30px;
  color: white;
  width: 30px;
  border-radius: 5px;
  background-color: var(--main-bg-color);
  border: var(--main-bg-color);
  padding: 10px;
  font-size: 1.2;

  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
}

.icon-button:hover {
  cursor: pointer;
}
.border {
  border-radius: 5px;
  margin: 2px;
  /* border: 1px solid var(--color-border-grey); */
  background-color: rgba(255, 255, 255, 0.075);
}
*::-webkit-scrollbar {
  width: 12px; 
}

*::-webkit-scrollbar-track {
  background: rgb(49, 49, 49);
}

*::-webkit-scrollbar-thumb {
  background-color: rgb(100, 100, 100); 
  border-radius: 20px;
}
.displayMsg {
  background-clip: rgb(175, 57, 57);
  position: fixed;
  top: 100px;
  right: 50%;
  max-width: 500px;
}
</style>