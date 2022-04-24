<template>
  <div class="app">
  <Header />
  <Content />
  <Menu />

  </div>
</template>

<script>
import Content from './components/template/Content.vue'
import Header from './components/template/Header.vue'
import Menu from './components/template/Menu.vue'


export default {
  name: 'App',
  components: {
    Content, Header, Menu
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#app, .app, body, html {
  box-sizing: border-box;
  margin: 0px;
  height: 100vh;
  width: 100vw;
}
* {
  border-collapse: collapse;
  background-color: rgb(32, 32, 32);
  color: white;
}

.app {
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 50px 1fr;
  grid-template-areas: 'header header'
                        'menu content';
}

</style>
