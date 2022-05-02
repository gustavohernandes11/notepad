<template>
  <div class="notecard flexcolumn">
    <div class="noteheader flexrow">
      <b>{{ noteTitle }}</b>
    </div>
    <div class="notebody">
      <p>{{ content }}</p>
    </div>
    <div class="notefooter s-between flexrow">
      <span class="flexrow">
        <button
          class="icon-button border"
          value="Edit"
          @click="this.$store.commit('setEditMode', 'edit')"
        >
          <i class="fa-solid fa-marker"></i>
        </button>
        <button
          class="icon-button border"
          v-if="!this.showConfirmButton"
          value="Delete"
          @click="this.toggleConfirm()"
        >
          <i class="fa-solid fa-trash-can border"></i>
        </button>
        <button
          class="icon-button danger"
          v-if="!!this.showConfirmButton"
          value="Confirmar"
          @click="
            this.$store.commit('deleteCurrentNote');
            this.$store.commit('loadNotes');
          "
        >
          <i class="fa-solid fa-trash-can"></i> 
        </button>
      </span>
      <div class="flexrow">
        <div v-if="favorite" class="icon" >★</div>
        <div v-else class="icon">☆</div>
      </div>
      
    </div>
  </div>
</template>

<script>
// "☆★"
export default {
  props: {
    noteTitle: String,
    content: String,
    category: String,
    favorite: Boolean,
  },
  date() {
    return {
      showConfirmButton: false,
      note: null
    };
  },
  methods: {
    timerConfirm(){
        setTimeout(() => { this.showConfirmButton = false }, 1000)
    },
    toggleConfirm() {
      this.showConfirmButton
        ? (this.showConfirmButton = false)
        : (this.showConfirmButton = true, this.timerConfirm());
      console.log(this.showConfirmButton);
      this.$store.commit("loadNotes");
    },
  },
};
</script>

<style>
.notecard {
  min-width: 200px;
  border-radius: 5px;
  margin: 5px;
  box-shadow: rgba(0, 0, 0, 0.192);
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
* > .notefooter {
 font-size: 1.0rem;
}
.danger {
  background-color: rgb(221, 74, 74)
}


</style>