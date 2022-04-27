<template>
  <div class="commonbutton">
    {{ value }}
  </div>
</template>

<script>
export default {
  props: {
    value: String,
  },
};
</script>

<style>
.commonbutton {
  height: 20px;
  border-radius: 5px;
  background-color: none;
  border: 1px solid var(--color-border-grey);
  padding: 15px;
  margin: 5px;
  font-size: 0.8rem;


  display: flex;
  align-items: center;
  justify-content: center;
}
.commonbutton:hover {
  background-color: rgb(241, 241, 241);
  color: black;
  cursor: pointer;
}
</style>