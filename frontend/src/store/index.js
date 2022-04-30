import { createStore } from 'vuex'
import axios from 'axios'
import { baseApiUrl } from '../global'
export default createStore({
  state: {
    user: {},
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
    setUser(state, user){
      state.user = user
      
      if (user) {
        axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`

      } else {
        delete axios.defaults.headers.common['Authorization']

      }
    },
    deleteCurrentNote(state) {
      const url = `${baseApiUrl}/notes/${state.note.id}`;
      axios.delete(url, state.note).then(() => {
        console.log('deletou')
        this.$store.commit("resetNote");
        this.$store.commit("loadNotes");
        this.$store.commit("setEditMode", null);

      });
    },
    getNote(state, note) {
      const url = `${baseApiUrl}/notes/${note.id}`;
      axios.get(url).then((res) => {
        state.note = res.data;
      });
    },

    setEditMode(state, mode) {
      state.isEditMode = mode
    },
    loadNotes(state) {
      console.log('loadNotes')

      const url = `${baseApiUrl}/notes`;
      axios.get(url).then((res) => {
        if (state.category.id) {
          state.notes = res.data.filter(note => note.category_id === state.category.id)
          console.log('filtrou')
        } else {
          state.notes = res.data;
          console.log('nao filtrou')
        }
        console.log(this.$store.state.notes);
      });
    },
    loadCategories(state) {
      const url = `${baseApiUrl}/categories`;
      axios.get(url).then((res) => {
        state.categories = res.data;
        state.loadNotes()
      });
    },

    resetCategory(state, category = null) {
      if (category === null) { state.category = {} } else {
        state.category = category
      }
    },
    resetNote(state, note = null) {
      if (note === null) { state.note = {} } else {
        state.note = note
      }
    },
    reset() {
      this.$store.commit("setEditMode", null);
      this.$store.commit("loadNotes");
      this.$store.commit("loadCategories");
    },

  },
  actions: {
    handleFavorite(context) {
      context.commit('toggleFavorite');
      context.commit('loadNotes');


    }
  },
  modules: {
  }
})
