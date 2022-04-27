import { createStore } from 'vuex'

export default createStore({
  state: {
    notes: [],
    note: {},
    categories: [],
    category: {},
    isEditMode: null,
    isMenuOpen: true
  },
  getters: {
  },
  mutations: {
    setEditMode(state, mode){
      state.isEditMode = mode
    }

  },
  actions: {
  },
  modules: {
  }
})
