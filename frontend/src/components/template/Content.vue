<template>
  <div class="content">
    <div class="notesArea">

    <div>
  <b-button>Button</b-button>
  <b-button variant="danger">Button</b-button>
  <b-button variant="success">Button</b-button>
  <b-button variant="outline-primary">Button</b-button>
</div>
    </div>
    <div class="editorArea">Editor</div>
  </div>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
export default {
  name: "content",
};
</script>

<style>
.content {
  grid-area: content;
  border-right: 1px solid rgba(192, 192, 192, 0.568);
  display: flex;
  flex-direction: row;

}
.notesArea {
  border-right: 1px solid rgba(192, 192, 192, 0.568);
  height: 100%;
  flex-grow: 2;
  padding: 15px;

}
.editorArea {
  height: 100%;
  flex-grow: 1;
  padding: 15px;


}
</style>