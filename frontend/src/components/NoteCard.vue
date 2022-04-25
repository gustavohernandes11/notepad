<template>
  <div class="notecard flexcolumn">
    <div class="noteheader flexrow">
      <b>{{ title }}</b>
      
    </div>
    <div class="notebody">
      <p>{{ content }}</p>
    </div>
    <div class="notefooter flexrow">
      <div v-if="favorite" class="icon" >★</div> <div v-else class="icon" style="color: #444">★</div>
<p>{{ category }}</p>
    </div>
  </div>
</template>

<script>
// "☆★"
export default {
  props: {
    title: String,
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
  cursor: pointer;
  padding: 3px
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
  padding-top: 8px ;

}
.notebody {
  flex-grow: 1;
  padding-top: 10px ;
}

.notefooter {
  width: 100%;
  height: 20px;
  align-items: center;
  justify-content: flex-end;
}
</style>