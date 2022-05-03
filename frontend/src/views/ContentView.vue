<template>
  <div @click="this.$store.commit('setMsg', null)" class="content">
    <Menu v-show="this.$store.state.isMenuOpen" />
    <div class="notesarea">
      <div class="notesareaheader flexcolumn">
        <span class="flexrow">
          <span class="flexrow">
            <h1>Anotações</h1>
            <div v-if="this.$store.state.msg" >
              <i class="fa-solid fa-circle-exclamation"></i>
              {{ this.$store.state.msg }}
            </div>
          </span>
          <div
            class="addNoteButton"
            v-if="
              this.$store.state.isEditMode === null &&
              this.$store.state.notes.length !== 0
            "
            @click="handleAdd()"
            
          >
            <i class="fa-solid fa-circle-plus"></i>
          </div>
        </span>
        <span class="flexrow">
          <h2 class="mr-2">
            {{
              this.$store.state.category.name
                ? this.$store.state.category.name
                : "Todos"
            }}
          </h2>
          <button v-if="!!this.$store.state.category.name" class="icon-button border" @click="deleteCategory()">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </span>
      </div>

      <p v-if="this.$store.state.categories.length === 0">
        Crie uma categoria para poder anotar!
      </p>
      <div
        v-else-if="this.$store.state.notes.length === 0"
        class="flexcenter addNoteCard"
        @click="handleAdd()"
      >
        <i class="fa-solid fa-plus mr-2"></i>
        <p>Adicionar nota</p>
      </div>
      <NoteCard
        v-for="note in this.$store.state.notes"
        :key="note.id"
        :favorite="note.favorite"
        :title="note.title"
        :category="note.category_id"
        :content="note.content"
        :important="note.important"
        @click="this.$store.commit('getNote', note)"
      />
    </div>
    <EditMenu v-show="this.$store.state.isEditMode !== null" />
  </div>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
import EditMenu from "../components/EditMenu.vue";
import NoteCard from "../components/NoteCard.vue";
import Menu from "../components/template/Menu.vue";
import axios from "axios";
import { baseApiUrl } from "@/global";

export default {
  name: "content",
  components: {
    NoteCard,
    Menu,
    EditMenu,
  },

  methods: {
    getCategories() {
      const url = `${baseApiUrl}/categories`;
      const userId = this.$store.state.user.id;
      axios.get(url, { params: { userId } }).then((res) => {
        this.$store.state.categories = res.data;
        this.$store.commit("loadNotes");
      });
    },
    reset() {
      this.$store.commit("setEditMode", null);
      this.$store.commit("loadNotes");
      this.$store.commit("loadCategories");
    },
    handleAdd() {
      this.$store.commit("resetNote");
      this.$store.commit("setEditMode", "add");
    },
    deleteCategory() {
      const url = `${baseApiUrl}/categories/${this.$store.state.category.id}`;
      axios
        .delete(url, this.$store.state.category)
        .then(() => {
          this.$store.commit("toUploadMenu");
          this.$store.commit("setCategory", null);
          this.getCategories();
          this.$store.commit("setMsg", null);
        })
        .catch((e) => this.$store.commit("setMsg", e.response.data));
    },
  },

  mounted() {
    this.$store.commit("loadNotes");
    console.log(!this.$store.state.notes);
    this.$store.commit("loadCategories");
  },
};
</script>

<style>
.content {
  grid-area: content;
  border-right: 1px solid var(--color-border-grey);
  display: flex;
  flex-direction: row;
  background-color: rgb(48, 48, 48);
  overflow: hidden;
}

* > .addNoteButton {
  font-size: 45px;
}
.addNoteButton {
  position: fixed;
  top: 100px;
  right: 50px;
}
.addNoteCard {
  min-width: 100px;
  border-radius: 5px;
  margin: 5px;
  box-shadow: rgba(0, 0, 0, 0.192);
  padding: 12px;
  font-size: 1rem;
  flex-grow: 1;
  flex-basis: 30%;
  border: 1px dashed var(--color-border-grey);
}
.addNoteCard:hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.247);
}
.notesarea {
  border-right: 1px solid var(--color-border-grey);
  height: 100%;
  display: flex;
  flex-grow: 3;
  flex-wrap: wrap;
  padding: 40px 15px;
  overflow-y: auto;
  align-content: baseline;
}
.notesareaheader {
  width: 100%;
}
.content h1 {
  width: 100%;
}
</style>