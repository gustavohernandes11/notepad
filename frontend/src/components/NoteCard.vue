<template>
  <div class="notecard flexcolumn">
    <div class="noteheader flexrow">
      <b>{{ titleNote }}</b>
    </div>
    <div class="notebody">
      <p>{{ content }}</p>
    </div>
    <div class="notefooter s-between flexrow">
      <span class="flexrow">
        <CommonButton
          value="Edit"
          @click="this.$store.commit('setEditMode', 'edit')"
        />
        <CommonButton  v-if="this.$store.state.isEditMode !== 'delete'" 
          value="Delete"
          @click="this.$store.commit('setEditMode', 'delete')"
        />
        <CommonButton v-else 
        value="Confirmar"
          @click="this.$store.commit('deleteCurrentNote'); this.$store.commit('setEditMode', null)"
        />
      </span>
      <div class="flexrow">
        <div v-if="favorite" class="icon">★</div>
      </div>
      <p>{{ category.color }}</p>
    </div>
  </div>
</template>

<script>
// "☆★"
import CommonButton from "./CommonButton.vue";
export default {
  components: {
    CommonButton,
  },
  props: {
    titleNote: String,
    content: String,
    category: String,
    favorite: Boolean,
  },
};
</script>

<style>
.notecard {
  min-height: 200px;
  min-width: 200px;
  border-radius: 5px;
  margin: 5px;
  border: 1px solid var(--color-border-grey);
  background-color: var(--main-bg-color);
  padding: 12px;
  font-size: 0.8rem;
  flex-grow: 1;
  flex-basis: 30%;
}
.icon {
  font-size: 20px;
  font-weight: 100;
  padding: 3px;
}
.notecard b {
  font-size: 1rem;
}
.notecard:hover {
  border-color: rgb(175, 175, 175);
}
.noteheader {
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
}
.notebody {
  flex-grow: 1;
  padding-top: 10px;
}

.notefooter {
  width: 100%;
  height: 20px;
  margin-top: 20px;
  align-items: center;
  justify-content: space-between;
}
</style>