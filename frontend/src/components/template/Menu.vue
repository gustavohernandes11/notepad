<template>
  <aside class="menu">
    <div class="menuheader flexrow">
      <p>Categorias</p>
      <CommonButton value="+" />
    </div>
    <CategoryCard name="All" />
    <CategoryCard
      v-for="category in categories"
      :key="category.id"
      :name="category.name"
      @click="getCategory(category)"
    />
  </aside>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
import CommonButton from "../CommonButton.vue";
import CategoryCard from "../CategoryCard.vue";
import { baseApiUrl } from "../../global";
import axios from "axios";

export default {
  name: "menu",

  data() {
    return {
      categories: [],
    };
  },
  components: {
    CategoryCard,
    CommonButton,
  },
  methods: {
    getCategories() {
      const url = `${baseApiUrl}/categories`;
      axios.get(url).then((res) => {
        this.categories = res.data;
      });
    },
    getCategory(category) {
      const url = `${baseApiUrl}/categories/${category.id}`;
      axios.get(url).then((res) => {
        this.$store.state.category = res.data;
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
  border-right: 1px solid var(--color-border-grey);
  border-bottom: 1px solid var(--color-border-grey);
  background-color: var(--main-bg-color);
  flex-grow: 1;
  min-width: 250px;

  padding: 30px 15px;
  position: sticky;
}
.menuheader {
  justify-content: space-between;
  align-items: center;
}
.menuheader > p {
  margin-bottom: 20px;
  margin-left: 15px;
}
</style>