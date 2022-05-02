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
        :selected="this.$store.state.category.id === category.id"
      >
        {{ category.name }}
      </option>
    </select>
    <input
      type="text"
      id="inputtitle"
      placeholder="Título"
      v-model="this.$store.state.note.title"
    />
    <textarea
      name="content"
      id="content"
      cols="30"
      rows="10"
      placeholder="Conteúdo"
      v-model="this.$store.state.note.content"
    />
    <!-- <input type="hidden" name="user_id" :value="this.$store.state.user.id" v-model="this.$store.state.note.user_id"> -->
    <CommonButton value="Cancelar" @click="reset()" />
    <CommonButton value="Enviar" @click="sendCurrentNote()" />
  </div>
</template>

<script>
import CommonButton from "./CommonButton.vue";
import axios from "axios";
import { baseApiUrl } from "../global";
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
      if (this.$store.state.note.id) {
        const url = `${baseApiUrl}/notes/${this.$store.state.note.id}`;

        this.$store.state.note.category_id = this.selectedCategoryId;
        this.$store.state.user.id = this.$store.state.note.user_id;

        console.log(this.$store.state.note);

        axios
          .put(url, this.$store.state.note)
          .then(() => {
            this.$store.commit("resetNote", null);
            this.$store.commit("loadNotes");
          })
        .catch((e) => this.$store.commit("setMsg", e.response.data));
         
      } else {
        const url = `${baseApiUrl}/notes`;

        this.$store.state.note.category_id = this.selectedCategoryId;
        this.$store.state.note.user_id = this.$store.state.user.id;

        axios.post(url, this.$store.state.note).then(() => {
          this.$store.commit("resetNote");
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
  height: 140px;
  flex-grow: 1;
}

.editorarea #inputcontent {
  height: 200px;
}
</style>