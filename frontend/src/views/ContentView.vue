<template>
  <div class="content">
    <Menu v-show="this.$store.state.isMenuOpen" />
    <div class="notesarea">
      <div class="notesareaheader flexcolumn">
        <span class="flexrow">
          <h1>Anotações</h1>
          <div
            class="addNoteButton"
            v-if="this.$store.state.isEditMode === null"
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

          <button class="icon-button border" @click="deleteCategory()">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </span>
      </div>
      <p v-if="this.$store.state.notes.length == 0">
        Não há anotações nessa categoria!
      </p>
      <NoteCard
        v-for="note in this.$store.state.notes"
        :key="note.id"
        :favorite="note.favorite"
        :noteTitle="note.title"
        :category="note.category_id"
        :content="note.content"
        @click="this.$store.commit('getNote', note)"
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
import { baseApiUrl } from "@/global";

export default {
  name: "content",
  components: {
    NoteCard,
    Menu,
    EditMenu,
  },
  data() {
    return {};
  },
  methods: {
    getCategories() {
      const url = `${baseApiUrl}/categories`;

      axios.get(url).then((res) => {
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
        })
        .catch((e) => console.log(e));
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
.notesarea {
  border-right: 1px solid var(--color-border-grey);
  height: 100%;
  display: flex;
  flex-grow: 3;
  flex-wrap: wrap;
  padding: 40px 15px;
  overflow-y: auto;
}
.notesareaheader {
  width: 100%;
}
.content h1 {
  width: 100%;
}
</style>