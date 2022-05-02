<template>
  <aside class="menu">
    <div class="menuheader flexrow">
      <p>Categorias</p>
      <button
        class="flexcenter icon-button"
        @click="setAddMode('add')"
        v-if="this.$store.state.isEditCategoryMode === null && this.$store.state.categories.length !== 0"
        value="+"
      >
        <i class="fa-solid fa-folder-plus"></i>
      </button>
    </div>
    <div
        v-if="
          this.$store.state.categories.length === 0 && this.$store.state.isEditCategoryMode !== 'add'"
        class="flexrow addCategoriaCard "
        @click="setAddMode('add')"
      >
      <i class="fa-solid fa-plus mr-2"></i>
        <p>Adiconar categoria</p>
      </div>
    <span class="flexrow mb-2" v-if="this.$store.state.isEditCategoryMode === 'add'">
      <input
        v-model="this.category.name"
        type="text"
        placeholder="Nome da categoria"
      />
      <button  @click="setAddMode(null)" class="flexcenter icon-button">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <button @click="handleAddCategory()" class="flexcenter icon-button">
        <i class="fa-solid fa-arrow-right-long"></i>
      </button>
    </span>
    <CategoryCard  name="All" @click="getCategory(null)" />
    <CategoryCard
      v-for="category in this.$store.state.categories"
      :key="category.id"
      :name="category.name"
      @click="getCategory(category)"
    />
  </aside>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
import CategoryCard from "../CategoryCard.vue";
import { baseApiUrl } from "../../global";
import axios from "axios";

export default {
  name: "menu",

  data() {
    return {
      categories: [],
      category: {},
    };
  },
  components: {
    CategoryCard,
  },
  methods: {
    handleAddCategory() {
      const url = `${baseApiUrl}/categories`;
      if (!this.$store.state.user.id) {
        return console.log("id de usuario nao encontrado");
      }
      this.category.user_id = this.$store.state.user.id;
      axios
        .post(url, this.category)
        .then(() => {
          this.category = {};
          this.getCategories();
          this.setAddMode(null);
        })
        .catch((e) => console.log(e));
    },

    setAddMode(mode) {
      this.$store.commit("setEditCategoryMode", mode);
    },

    getCategories() {
      const url = `${baseApiUrl}/categories`;
      const userId = this.$store.state.user.id
      axios.get(url, {params: { userId }}).then((res) => {
        this.$store.state.categories = res.data;
        this.$store.commit("loadNotes");
      }).catch(() => console.log(this.$store.state.user.id));
    },
    getCategory(category) {
      if (category === null) {
        this.$store.commit("setCategory");
        this.$store.commit("loadNotes");
      }

      const url = `${baseApiUrl}/categories/${category.id}`;
            const userId = this.$store.state.user.id
      axios.get(url, {params: { userId }}).then((res) => {
        this.$store.state.category = res.data;
        this.$store.commit("loadNotes");
        console.log(this.$store.state.category);
      });
    },
  },

  mounted() {
    this.getCategories();
  },
};
</script>

<style>
.menu {
  grid-area: menu;
  background-color: var(--main-bg-color);
  flex-shrink: none;
  min-width: 260px;
  overflow-y: auto;

  padding: 30px 15px;
  position: sticky;
}

.menu input {
  /* height: 40px; */
  width: 100px;
  flex-grow: 4;
  border-radius: 5px;
  background-color: var(--main-bg-color);
  border: 1px solid var(--color-border-grey);
  padding: 15px;
  margin: 5px;
  font-size: 0.8rem;
}
.addCategoriaCard {
 min-width: 20px;
  border-radius: 5px;
  margin: 5px;
  box-shadow: rgba(0, 0, 0, 0.192);
  background-color: var(--main-bg-color);
  border: 1px dashed var(--color-border-grey);

  padding: 5px;
  font-size: 0.8rem;
  flex-grow: 1;
  flex-basis: 30%;
  align-items: center;
  justify-content: space-around ;
}
.addCategoriaCard:hover {
cursor: pointer;
    background-color: rgba(247, 247, 247, 0.164)

}
.menuheader {
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
}
.menuheader > p {
  margin-bottom: 20px;
  margin-left: 15px;
}
.menufooter {
  justify-content: space-between;
  align-items: center;
}
</style>