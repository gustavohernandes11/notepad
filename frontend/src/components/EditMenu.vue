<template>
  <div class="editorarea flexcolumn">
    <p v-if="this.$store.state.isEditMode === 'edit'">Edição</p>
    <p v-if="this.$store.state.isEditMode === 'add'">Nova anotação</p>

    <select
      v-model="selectedCategoryId"
      type="number"
      name="category"
      id="category"
    >
      <option
        v-for="category in this.$store.state.categories"
        :key="category.id"
        :value="category.id"
      >
        {{ category.name }}
      </option>
    </select>
    <input
      name="title"
      type="text"
      maxlength="200"
      id="inputtitle"
      placeholder="Título"
      v-model="this.$store.state.note.title"
    />
    <textarea
      name="content"
      maxlength="255"
      id="content"
      cols="30"
      rows="10"
      placeholder="Conteúdo"
      v-model="this.$store.state.note.content"
    />
    <span class="flexrow">
      <span class="checkbox">
        <input
          type="checkbox"
          v-model="this.$store.state.note.favorite"
          :value="true"
          id="favorite"
        />
        <label for="favorite">Favorito</label>
      </span>
      <span class="checkbox ml-2">
        <input
          type="checkbox"
          v-model="this.$store.state.note.important"
          id="important"
        />
        <label for="important">Fixar</label>
      </span>
    </span>

    <CommonButton value="Cancelar" @click="reset()" />
    <CommonButton value="Enviar" @click="sendCurrentNote()" />
    <p v-if="this.$store.state.note.id">
      <small>Data de criação: {{ this.$store.state.note.createdAt }}</small>
    </p>
  </div>
</template>

<script>
import CommonButton from "./CommonButton.vue";
import axios from "axios";
import { baseApiUrl } from "../global";
/* eslint-disable no-unreachable */

export default {
  name: "MenuEdit",
  components: {
    CommonButton,
  },
  data() {
    return {
      selectedCategoryId: Number,
    };
  },
  methods: {
     sendCurrentNote() {
      console.log(this.$store.state.note);
      if (this.$store.state.note.id) {

        const url = `${baseApiUrl}/notes/${this.$store.state.note.id}`;
        this.$store.state.user.id = this.$store.state.note.user_id;

        console.log(this.$store.state.note);

        axios
          .put(url, this.$store.state.note)
          .then(() => {
            this.$store.commit("resetNote", null);
            this.$store.commit("setEditMode", null);
          })
          .then(() => {
            this.$store.state.notes = [];
            this.$store.commit("loadNotes");
          })
          .catch((e) => this.$store.commit("setMsg", e.response.data));
      } else {
        const url = `${baseApiUrl}/notes`;
        this.$store.state.note.category_id = this.selectedCategoryId;
        this.$store.state.note.user_id = this.$store.state.user.id;

        axios
          .post(url, this.$store.state.note)
          .then(() => {
            this.$store.commit("resetNote", null);
            this.$store.commit("loadNotes");
          })
          .catch((e) => this.$store.commit("setMsg", e.response.data));
      }
    },
    reset() {
      this.$store.commit("setEditMode", null);
    },
  },
};
</script>

<style>
.editorarea {
  height: 100%;
  min-width: 350px;
  padding: 30px 15px;
}
.editorarea input,
.editorarea textarea,
.editorarea select {
  height: 50px;
  border-radius: 5px;
  background-color: var(--main-bg-color);
  border: 1px solid var(--color-border-grey);
  padding: 15px;
  margin: 5px;
  font-size: 0.8rem;
}
.editorarea textarea {
  resize: none;
  flex-grow: 1;
}

.editorarea #inputcontent {
  height: 200px;
}
</style>