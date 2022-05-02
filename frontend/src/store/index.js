import { createStore } from 'vuex'
import axios from 'axios'
import { baseApiUrl } from '../global'
export default createStore({
  state: {
    user: null,
    notes: [],
    note: {},
    categories: [],
    category: {},
    msg: null,
    isEditMode: null,
    isEditCategoryMode: null,
    isMenuOpen: true,

  },
  getters: {
  },
  mutations: {
    setUser(state, user) {
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

      })
      .catch((e) => this.$store.commit("setMsg", e.response.data));
      
    },
    getNote(state, note) {
      const url = `${baseApiUrl}/notes/${note.id}`;
      const userId = state.user.id
      axios.get(url, {params: { userId }}).then((res) => {
        state.note = res.data;
      })
      .catch((e) => this.$store.commit("setMsg", e.response.data));
    },

    setEditMode(state, mode) {
      state.isEditMode = mode
    },
    setEditCategoryMode(state, mode) {
      state.isEditCategoryMode = mode
    },
    loadNotes(state) {
      console.log('loadNotes')
      const url = `${baseApiUrl}/notes`;
      const userId = state.user.id
      axios.get(url, {params: { userId }}).then((res) => {
        if (state.category.id) {
          state.notes = res.data.filter(note => note.category_id === state.category.id)
        } else {
          state.notes = res.data;
        }
        console.log(state.notes);
      })
        .catch((e) => this.$store.commit("setMsg", e.response.data));
    },
    loadCategories(state) {
      const url = `${baseApiUrl}/categories`;
      const userId = state.user.id
      axios.get(url, {params: { userId }}).then((res) => {
        state.categories = res.data;
        state.loadNotes()
      })
        .catch((e) => this.$store.commit("setMsg", e.response.data));
    },

    setCategory(state, category = null) {
      if (category === null) { state.category = {} } else {
        state.category = category
      }
    },
    resetNote(state, note = null) {
      if (note === null) { state.note = {} } else {
        state.note = note
      }
    },
    setMsg(state, msg){
        state.msg = msg;
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
