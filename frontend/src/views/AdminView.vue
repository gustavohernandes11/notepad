<template>
  <div @click="this.$store.commit('setMsg', null)" class="adminbox flexrow">
    <div v-if="isAdminEditMode" class="editbox flexcolumn">
      <b class="mt-2 mb-2">Modo de Edição</b>

      <div class="inputs flexcolumn">
        <input
          type="text"
          :readonly="isReadOnly"
          v-model="user.name"
          placeholder="Name"
        />
        <input
          type="text"
          :readonly="isReadOnly"
          v-model="user.email"
          placeholder="Email"
        />
        <input
          id="password"
          name="password"
          type="password"
          v-if="isAdminEditMode === 'edit'"
          v-model="user.password"
          placeholder="Password"
        />
        <input
          v-if="isAdminEditMode == 'edit'"
          v-model="user.confirmPassword"
          placeholder="Confirm Password"
          id="confirmpassword"
          name="confirmpassword"
          type="password"
        />
        <span v-if="isAdminEditMode == 'edit'" class="checkbox">
          <input type="checkbox" v-model="user.admin" value="true" id="admin" />
          <label for="checkbox">Admin</label>
        </span>
      </div>
      <div class="actions flexrow mt-1">
        <CommonButton value="Cancelar" @click="setEditMode(null)" />
        <CommonButton
          v-if="isAdminEditMode === 'edit'"
          @click="sendCurrentUser()"
          value="Enviar"
        />
        <CommonButton v-else value="Deletar" @click="deleteCurrentUser()" />
      </div>
      <div  v-if="this.$store.state.msg" class="mt-2">
      <i class="fa-solid fa-circle-exclamation"></i> {{ this.$store.state.msg }}
    </div>
    </div>
    <div class="tablebox">
      <div class="tableboxheader flexrow mt-2">
        <h1>Banco de usuários</h1>
        <span class="flexrow">
          <CommonInput placeholder="Buscar" />
          <CommonButton
            v-if="isAdminEditMode === null"
            value="Cadastrar Usuário"
            placeholder="Buscar"
            @click="setEditMode('edit')"
          />
        </span>
      </div>
      <table>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Admin</th>
          <th>Actions</th>
        </tr>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.admin }}</td>
          <td class="flexrow flexcenter">
            <CommonButton
              @click="getUser(user.id, 'edit')"
              value="Editar"
            /><CommonButton
              @click="getUser(user.id, 'delete')"
              value="Excluir"
            />
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import CommonInput from "../components/CommonInput.vue";
import CommonButton from "../components/CommonButton.vue";

import axios from "axios";
import { baseApiUrl } from "../global";

export default {
  name: "AdminView",
  components: {
    CommonButton,
    CommonInput,
  },
  data() {
    return {
      isAdminEditMode: null,
      users: [],
      user: {},
    };
  },
  methods: {
    setEditMode(mode) {
      if (mode === null) {
        this.user = {};
      }
      this.isAdminEditMode = mode;
    },
    loadUsers() {
      const url = `${baseApiUrl}/users`;
      axios
        .get(url)
        .then((res) => (this.users = res.data))
        .catch((e) => this.$store.commit("setMsg", e.response));
    },
    getUser(id, mode = null) {
      if (mode) {
        this.setEditMode(mode);
      }
      const url = `${baseApiUrl}/users/${id}`;
      axios
        .get(url)
        .then((res) => ((this.user = res.data), (this.user.password = "")))
        .catch((e) => this.$store.commit("setMsg", e));
    },
    sendCurrentUser() {
      console.log(this.user);
      if (this.user.id) {
        const url = `${baseApiUrl}/users/${this.user.id}`;
        axios
          .put(url, this.user)
          .then(() => {
            console.log("put");
            this.reset();
            this.$store.commit("setMsg", null)
          })
          .catch((e) => this.$store.commit("setMsg", e.response.data));
      } else {
        const url = `${baseApiUrl}/users`;
        axios
          .post(url, this.user)
          .then(() => {
            console.log("post");
            this.reset();
            this.$store.commit("setMsg", null)
          })
          .catch((e) => this.$store.commit("setMsg", e.response.data));
      }
    },
    reset() {
      this.user = {};
      this.loadUsers();
      this.isAdminEditMode = null;
      this.$store.commit("setMsg", null)
    },
    async deleteCurrentUser() {
      console.log(this.user, this.isAdminEditMode);

      const url = `${baseApiUrl}/users/${this.user.id}`;
      axios.delete(url).then(() => console.log("deleted"));

      this.reset();
    },
    computed: {
      isReadOnly() {
        if (this.isAdminEditMode === "remove") {
          return true;
        } else {
          return false;
        }
      },
    },
  },
  mounted() {
    this.loadUsers();
  },
};
</script>

<style>
.adminbox {
  grid-area: content;
  background-color: var(--main-bg-color);
  min-height: 100%;
  box-sizing: border-box;
}
.editbox {
  border-right: 1px solid var(--color-border-grey);
  flex-grow: 1;
  padding: 20px;
  min-width: 300px;
}
.tablebox {
  flex-grow: 2;
  padding: 20px;
  overflow-y: scroll;
}
.tablebox table {
  margin: 30px 0px;
  width: 100%;
}
.tablebox td {
  padding: 0px 10px;
  border: 1px solid rgba(211, 211, 211, 0.178);
}
.tablebox th {
  padding: 10px;
}
.inputs input {
  flex-wrap: wrap;
  flex-basis: 50%;
  height: 20px;
  border-radius: 5px;
  background-color: var(--main-bg-color);
  border: 1px solid var(--color-border-grey);
  padding: 15px;
  margin: 5px;
  font-size: 0.8rem;
}
input[readonly] {
  background-color: rgba(85, 36, 36, 0.548);
}
.tableboxheader {
  align-items: center;
  justify-content: space-between;
}

.userinfo {
  margin: 10px;
}
</style>