<template>
  <div class="content">
    <Menu v-if="isMenuOpen" />
    <div class="notesarea">
      <div class="notesareaheader flexcolumn">
        <h1>Anotações</h1>
        <p>{{ this.currentCategory }}</p>
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
    <div v-if="isEditMode" class="editorArea flexcolumn">
      <p v-if="isEditMode === 'edit'">Edição</p>
      <p v-else>Nova anotação</p>
        <select
          type="number"
          name="category"
          id="category"
          placeholder="Categoria"
        >
          <option v-for="category in categories" :key="category.id" >{{category.name}}</option>
        </select>
      <input
        type="text"
        name="title"
        id="inputtitle"
        placeholder="Título"
        :v-model="note.title"
      />
      <textarea
        name="content"
        id="content"
        cols="30"
        rows="10"
        placeholder="Conteúdo"
        v-model="note.content"
      />
      <CommonButton value="Cancelar" @click="reset()"/>
      <CommonButton value="Enviar" />
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
import NoteCard from "../components/NoteCard.vue";
import CommonButton from "../components/CommonButton.vue";
import Menu from "../components/template/Menu.vue";
import axios from "axios";
import { baseApiUrl } from "@/global.js";

export default {
  name: "content",
  components: {
    NoteCard,
    Menu,
    CommonButton,
  },
  data() {
    return {
      isEditMode: 'edit',
      isMenuOpen: true,
      notes: [],
      note: {},
      categories: [],
      category: {},
      currentCategory: 'all'
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
        this.getNotes();
      });
    },
    reset(){
      this.isEditMode = null
      this.note = {}
    }
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
  overflow-y: scroll;
}
.notesarea {
  border-right: 1px solid var(--color-border-grey);
  height: 100%;
  display: flex;
  flex-grow: 3;
  flex-wrap: wrap;
  padding: 40px 15px;
  overflow-y: hidden;
}
.notesareaheader {
  width: 100%;
}
.content h1 {
  width: 100%;
}
.editorArea {
  height: 100%;
  min-width: 350px;
  flex-grow: 1;
  padding: 30px 15px;
}
.editorArea input,
.editorArea textarea,
.editorArea select {
  flex-grow: 1;
  flex-wrap: wrap;
  flex-basis: 50%;
  height: 20px;
  border-radius: 5px;
  background-color: var(--main-bg-color);
  border: 1px solid var(--color-border-grey);
  padding: 15px;
  margin: 5px;
  font-size: 0.8rem;
}

.editorArea #inputcontent {
  height: 200px;
}
option {
  padding: 15px;
}
</style>