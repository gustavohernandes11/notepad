<template>
  <div class="app">
    <Header />
    <router-view v-if="!validatingToken" />
    <div v-else class="loading">Validando</div>
  </div>
</template>
<script>
import Header from "./components/template/Header.vue";
import { userKey, baseApiUrl } from './global'
import axios from 'axios'
export default {
  components: {
    Header,
  },
  data(){
      return {
        validatingToken: true
    }
  },
  methods: {
    async validateToken() {
			this.validatingToken = true

			const json = localStorage.getItem(userKey)
			const userData = JSON.parse(json)
			this.$store.commit('setUser', null)

			if(!userData) {
				this.validatingToken = false
				this.$router.push({ name: 'auth' })
				return
			}

			const res = await axios.post(`${baseApiUrl}/validateToken`, userData)

			if (res.data) {
				this.$store.commit('setUser', userData)
				
			} else {
				localStorage.removeItem(userKey)
				this.$router.push({ name: 'login' })
			}

			this.validatingToken = false
		}
  },
  created(){
    this.validateToken()
  }
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
#app, .app, body, html {
  margin: 0px;
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  overflow-y:hidden;
  
}
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  box-sizing: border-box;
  border-collapse: collapse;
  color: rgb(224, 224, 224);
}
.flexrow {
  display: flex;
  flex-direction: row;

}
.flexcolumn{
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
    margin-bottom:5px;
}
.app {
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 50px 1fr;
  grid-template-areas: 'header header'
                        'content content';
}
.loading {
  grid-area: content;

}
.mt-1 {
  margin-top: 10px
}
.mb-2 {
  margin-bottom: 20px
}
.s-between {
  justify-content: space-between
  
}
</style>