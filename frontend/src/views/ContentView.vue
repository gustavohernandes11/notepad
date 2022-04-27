<template>
  <div class="content">
    <Menu v-show="this.$store.state.isMenuOpen" />
    <div class="notesarea">
      <div class="notesareaheader flexcolumn">
        <h1>Anotações</h1>
        <h2>
          {{
            this.$store.state.category
              ? this.$store.state.category.name
              : "Todos"
          }}
        </h2>
      </div>
      <NoteCard
        v-for="note in this.$store.state.notes"
        :key="note.id"
        :favorite="note.favorite"
        :titleNote="note.title"
        :category="note.category_id"
        :content="note.content"
        @click="getNote(note)"
      />
    </div>
    <EditMenu v-if="this.$store.state.isEditMode" />
  </div>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
import EditMenu from "../components/EditMenu.vue";
import NoteCard from "../components/NoteCard.vue";
import Menu from "../components/template/Menu.vue";
import axios from "axios";
import { baseApiUrl } from "@/global.js";

export default {
  name: "content",
  components: {
    NoteCard,
    Menu,
    EditMenu,
  },
  data() {
    return {
      isEditMode: true,
    };
  },
  methods: {
    loadNotes() {
      const url = `${baseApiUrl}/notes`;
      axios.get(url).then((res) => {
        this.$store.state.notes = res.data;
        console.log(this.$store.state.notes);
      });
    },
    loadCategories() {
      const url = `${baseApiUrl}/categories`;
      axios.get(url).then((res) => {
        this.$store.state.categories = res.data;
      });
    },
    getNote(note) {
      const url = `${baseApiUrl}/notes/${note.id}`;
      axios.get(url).then((res) => {
        this.$store.state.note = res.data;
      });
    },

    toggleFavorite() {
      const url = `${baseApiUrl}/notes/${this.note.id}`;
      this.note.favorite
        ? (this.note.favorite = false)
        : (this.note.favorite = true);

      axios.put(url, this.note).then((res) => {
        this.note = res.data;
        this.getNotes();
      });
    },
    
    reset() {
      this.$store.commit("setEditMode", null);
    },
  },

  mounted() {
    this.loadNotes();
    this.loadCategories();
  },
};
</script>

<style>
.content {
  grid-area: content;
  border-right: 1px solid var(--color-border-grey);
  display: flex;
  flex-direction: row;
  background-color: rgb(22, 22, 22);
}
.notesarea {
  border-right: 1px solid var(--color-border-grey);
  height: 100%;
  display: flex;
  flex-grow: 3;
  flex-wrap: wrap;
  padding: 40px 15px;
  overflow-y: scroll;
}
.notesareaheader {
  width: 100%;
}
.content h1 {
  width: 100%;
}
</style>