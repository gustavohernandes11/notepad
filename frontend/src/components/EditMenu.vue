<template>
  <div class="editorarea flexcolumn">
    <p>Edição</p>
    <select type="number" name="category" id="category">
      <option
        v-for="category in this.$store.state.categories"
        :key="category.id"
      >
        {{ category.name }}
      </option>
    </select>
    <input
      type="text"
      name="title"
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
    <CommonButton value="Cancelar" @click="reset()" />
    <CommonButton value="Enviar" />  
  </div>
</template>

<script>
import CommonButton from "./CommonButton.vue";
export default {
  name: "MenuEdit",
  components: {
    CommonButton,
  },
  methods: {
      reset(){
          this.$store.commit('setEditMode', null)
      }
  }
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

.editorarea #inputcontent {
  height: 200px;
}
</style>