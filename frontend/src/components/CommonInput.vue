<template>
  <input :type="type" :id="id" :name="name"  class="commoninput" />

</template>

<script>
export default {
  props: {
    value: String,
    type: String,
    id: String,
    name: String,
  },
};
</script>

<style>
.commoninput {
  height: 20px;
  border-radius: 5px;
  background-color: var(--main-bg-color);
  border: 1px solid var(--color-border-grey);
  padding: 15px;
  margin: 5px;
  font-size: 0.8rem;
  


}
</style>