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
      @click="getCategory(category.id)"
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
    getCategory(id) {
      const url = `${baseApiUrl}/categories/${id}`;
      axios.get(url).then((res) => {
        this.category = res.data;
        console.log(this.category)
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

  padding: 30px 15px;
  position: sticky;
}
.menuheader > p {
  margin-bottom: 20px;
  margin-left: 15px;
}
</style>