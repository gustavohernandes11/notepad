<template>
  <div class="categorycard flexrow">
    <p>{{ name }}</p>
    <div class="actionbox flexrow">
    <!-- <p>E</p>
    <p>D</p> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
  },
};
</script>

<style>
.categorycard {
  /* margin: 10px 0px; */
  padding: 0px 15px;
  background-color: var(--main-bg-color);
  font-size: 0.8rem;
  flex-wrap: nowrap;
}
.categorycard:hover {
  cursor: pointer;
    background-color: rgba(247, 247, 247, 0.164)
}

.icon {
  font-size: 20px;
  font-weight: 100;
  cursor: pointer;
  padding: 3px;
}
.actionbox > p {
    padding: 0px 10px
}


</style>