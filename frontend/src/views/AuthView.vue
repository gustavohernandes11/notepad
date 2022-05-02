<template>
  <div @click="this.$store.commit('setMsg', null)" class="authview flexcenter">
    <div v-if="this.$store.state.msg !== null"  class="displayMsg">
      <i class="fa-solid fa-circle-exclamation"></i> {{ this.$store.state.msg }}
    </div>
    <div class="authbox">
      <h1 v-if="this.showSignup" class="mb-2">Login</h1>
      <h1 v-else class="mb-2">Cadastro</h1>
      <div class="inputs flexcolumn">
        <input
          v-model="this.user.name"
          v-if="!this.showSignup"
          placeholder="Nome"
          name="name"
          type="text"
          id="inputname"
        />
        <input
          required
          v-model="this.user.email"
          placeholder="Email"
          name="email"
          type="email"
          id="inputemail"
        />
        <input
          required
          v-model="this.user.password"
          placeholder="Senha"
          name="password"
          type="password"
          id="inputpassword"
        />
        <input
          v-model="this.user.confirmPassword"
          v-if="!showSignup"
          placeholder="Confirme sua senha"
          name="confirmPassword"
          type="password"
          id="inputconfirmpassword"
        />
      </div>

      <div class="actions">
        <CommonButton
          v-if="showSignup"
          class="mb-2 mt-2"
          value="Enviar"
          @click="
            signin();
            showconsole();
          "
        />
        <CommonButton v-else value="Registrar" @click="signup()" />
        <a v-if="this.showSignup" @click="toggleshowSignup()"
          >Não tem cadastro? Crie sua conta!</a
        >
        <a v-else @click="toggleshowSignup">Ja possui uma conta: faça login!</a>
      </div>
    </div>
  </div>
</template>

<script>
import CommonButton from "../components/CommonButton.vue";
import axios from "axios";
import { baseApiUrl, userKey } from "@/global.js";

export default {
  name: "authView",
  components: {
    CommonButton,
  },
  data: function () {
    return {
      showSignup: true,
      user: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    showconsole() {
      console.log(this.user);
    },
    toggleshowSignup() {
      this.showSignup = !this.showSignup;
      this.user.password = "";
      this.user.confirmPassword = "";
    },
    signin() {
      console.log("signin" + this.user);

      const url = `${baseApiUrl}/signin`;
      axios
        .post(url, this.user)
        .then((res) => {
          console.log("Logado", res.data);
          this.$store.commit("setUser", res.data);
          localStorage.setItem(userKey, JSON.stringify(res.data));
          this.$router.push({ path: "/" });
          this.$store.commit("setMsg", null)
        })
        .catch((e) => this.$store.commit("setMsg", e.response.data));
    },
    signup() {
      console.log("signup" + this.user);

      const url = `${baseApiUrl}/signup`;
      axios
        .post(url, this.user)
        .then((res) => {
          console.log("Registrado", res.data);
          this.user = {};
          this.showSignup = true;
          this.$store.commit("setMsg", null)
        })
        .catch((e) => this.$store.commit("setMsg", e.response.data));
    },
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
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.authbox button {
  width: 30px;
}
.authbox input {
  width: 260px;
}

.authbox a {
  margin-top: 20px;
  font-size: 0.8rem;
  font-weight: 100;
  text-decoration: none;
}
.authbox a:hover {
  cursor: pointer;
}
</style>