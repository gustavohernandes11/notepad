<template>
  <div class="content">
    <div class="notesarea">
      <div class="notesareaheader flexcolumn">
        <h1>Anotações</h1>
        <p>All</p>
      </div>
      <NoteCard
        v-for="note in notes"
        :key="note.id"
        :favorite="note.favorite"
        :title="note.title"
        :category="note.category_id"
        :content="note.content"
        @click="getNote(note)"
      />
    </div>
    <div v-if="isEditMode" class="editorArea">
      <b> Área de adição de notas </b>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
import NoteCard from "../NoteCard.vue";
import axios from "axios";
import { baseApiUrl } from "@/global.js";

export default {
  name: "content",
  components: {
    NoteCard,
  },
  data() {
    return {
      isEditMode: false,
      notes: [],
      note: {},
      categories: [],
      category: {},
    };
  },
  methods: {
    loadNotes() {
      const url = `${baseApiUrl}/notes`;
      axios.get(url).then((res) => {
        this.notes = res.data;
      });
    },
    loadCategories() {
      const url = `${baseApiUrl}/categories`;
      axios.get(url).then((res) => {
        this.categories = res.data;
        console.log(this.categories);
      });
    },
    getNote(note) {
      const url = `${baseApiUrl}/notes/${note.id}`;
      axios.get(url).then((res) => {
        this.note = res.data;
      });
      console.log(note);
    },
     toggleFavorite() {
      const url = `${baseApiUrl}/notes/${this.note.id}`;
      this.note.favorite
        ? (this.note.favorite = false)
        : (this.note.favorite = true);

      axios.put(url, this.note).then((res) => {
        this.note = res.data;
        this.getNotes()
      });

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
  overflow-y:scroll;
}
.notesarea {
  border-right: 1px solid var(--color-border-grey);
  height: 100%;
  display: flex;
  flex-grow: 2;
  flex-wrap: wrap;
  padding: 30px 15px;
}
.notesareaheader {
  width: 100%;
}
.content h1 {
  width: 100%;
}
.editorArea {
  height: 100%;
  min-width: 300px;
  flex-grow: 1;
  padding: 30px 15px;
}
</style>