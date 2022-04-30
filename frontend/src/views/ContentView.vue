<template>
  <div class="content">
    <Menu v-show="this.$store.state.isMenuOpen" />
    <div class="notesarea">
      <div class="notesareaheader flexcolumn">
        <span class="flexrow">
          <h1>Anotações</h1>
          <CommonButton v-if="this.$store.state.isEditMode !== 'add'"
            class="flexcenter"
            value="Adicionar"
            @click="handleAdd();"
          />
        </span>
        <h2>
          {{
            this.$store.state.category.name
              ? this.$store.state.category.name
              : "Todos"
          }}
        </h2>
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
import CommonButton from "../components/CommonButton.vue";
import Menu from "../components/template/Menu.vue";


export default {
  name: "content",
  components: {
    NoteCard,
    Menu,
    EditMenu,
    CommonButton,
  },
  data() {
    return {};
  },
  methods: {
    reset() {
      this.$store.commit("setEditMode", null);
      this.$store.commit("loadNotes");
      this.$store.commit("loadCategories");
    },
    handleAdd() {
      this.$store.commit("resetNote");
      this.$store.commit("setEditMode", 'add');
    },
  },

  mounted() {
    this.$store.commit("loadNotes");
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
  background-color: rgb(22, 22, 22);
  overflow: hidden;
}

.notesarea {
  border-right: 1px solid var(--color-border-grey);
  height: 100%;
  display: flex;
  flex-grow: 3;
  flex-wrap: wrap;
  padding: 40px 15px;
  overflow-y:auto;
}
.notesareaheader {
  width: 100%;
}
.content h1 {
  width: 100%;
}
</style>