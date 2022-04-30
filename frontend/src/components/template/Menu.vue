<template>
  <aside class="menu">
    <div class="menuheader flexrow">
      <p>Categorias</p>
      <button
        class="flexcenter"
        @click="setAddMode('add')"
        v-if="this.$store.state.isEditCategoryMode === null"
        value="+"
      >
        +
      </button>
    </div>
    <span class="flexrow" v-if="this.$store.state.isEditCategoryMode === 'add'">
      <input
        v-model="this.category.name"
        type="text"
        placeholder="Nome da categoria"
      />
      <button @click="setAddMode(null)" class="flexcenter">X</button>
      <button @click="handleAddCategory()" class="flexcenter">+</button>
    </span>
    <CategoryCard name="All" @click="getCategory(null)" />
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
      axios.get(url).then((res) => {
        this.$store.state.categories = res.data;
        this.$store.commit("loadNotes");
      });
    },
    getCategory(category) {
      if (category === null) {
        this.$store.commit("setCategory");
        this.$store.commit("loadNotes");
      }
      const url = `${baseApiUrl}/categories/${category.id}`;
      axios.get(url).then((res) => {
        this.$store.state.category = res.data;
        this.$store.commit("loadNotes");
        console.log(this.$store.state.category);
      });
    },
  },

  mounted() {
    this.getCategories();
  }
};
</script>

<style>
.menu {
  grid-area: menu;
  border-right: 1px solid var(--color-border-grey);
  border-bottom: 1px solid var(--color-border-grey);
  background-color: var(--main-bg-color);
  flex-shrink: none;
  min-width: 260px;

  padding: 30px 15px;
  position: sticky;
}
.menu button {
  height: 30px;
  max-width: 20px;
  flex-grow: 1;
  border-radius: 5px;
  background-color: var(--main-bg-color);
  border: 1px solid var(--color-border-grey);
  padding: 15px;
  margin: 3px;
  font-size: 0.8rem;
}
.menu button:hover {
  cursor: pointer;
}
.menu input {
  height: 30px;
  width: 100px;
  flex-grow: 4;
  border-radius: 5px;
  background-color: var(--main-bg-color);
  border: 1px solid var(--color-border-grey);
  padding: 15px;
  margin: 3px;
  font-size: 0.8rem;
}
.menuheader {
  justify-content: space-between;
  align-items: center;
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