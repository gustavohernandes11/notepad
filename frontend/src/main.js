/* eslint-disable no-unused-vars */
// import './plugins/bootstrap-vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// import store from './store.js'
// import { Store } from 'vuex'


// const store = Store.createStore({
//   state: {
//     category:{},
//     test: "testestes",
//     note: {}
//   },
//   mutations: {}

// });


createApp(App).use(router).mount('#app')

