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
:root {
  --main-bg-color: rgb(32, 32, 32);
  --color-border-grey: rgba(192, 192, 192, 0.568);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
  box-sizing: border-box;
  border-collapse: collapse;
  color: rgb(233, 233, 233);
}
.flexrow {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
                        'menu content';
}

</style>
