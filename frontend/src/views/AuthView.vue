<template>
  <div class="authview flexcenter">
    <div class="authbox">
      <b class="mb-2">Faça login</b>
      <div class="inputs flexcolumn">
        <CommonInput
          placeholder="Email"
          name="email"
          type="email"
          id="inputemail"
        />
        <CommonInput
          placeholder="Senha"
          name="password"
          type="password"
          id="inputpassword"
        />
      </div>

      <div class="actions">
        <CommonButton class="mb-2" value="Enviar" />
        <a href="/signup">Não tem cadastro? Crie sua conta!</a>
      </div>
    </div>
  </div>
</template>

<script>
import CommonButton from "../components/CommonButton.vue";
import CommonInput from "../components/CommonInput.vue";
export default {
  name: "authView",
  components: {
    CommonButton,
    CommonInput,
  },
};
</script>

<style>
.authview {
  grid-area: content;
  display: flex;
  flex-direction: column;
  background-color: rgb(22, 22, 22);
  height: 100%;
}
.authbox {
  min-height: 350px;
  min-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.027);
  border: 1px solid var(--color-border-grey);
}
.authbox button {
  width: 40px
}

.authbox a {
  font-size: 0.7rem;
  font-weight: 100;
  text-decoration: none;
}
</style>