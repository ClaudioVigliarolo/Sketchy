<template>
  <form>
    <div class="container">
      <img src="../../style/sfondo2.svg" id="bg" alt />
      <img src="../../style/logo.svg" class="logo" alt />

      <div class="center content-inputs">
        <vs-input
          size="l"
          label="username"
          v-model="username"
          placeholder="Invalid"
          :style=" isError ? 'color:red; ' : 'color:white; ;'"
        />
      </div>
      <div class="center content-inputs">
        <vs-input
          size="l"
          label="email"
          v-model="email"
          placeholder="Invalid"
          :style=" isError ? 'color:red; ' : 'color:white; ;'"
        />
      </div>
      <div class="center content-inputs">
        <vs-input
          size="l"
          label="Password"
          type="password"
          v-model="password"
          :style=" isError ? 'color:red; ' : 'color:white; ;'"
          placeholder="Evan You"
          style="color:white"
        />
      </div>

      <div>
        <vs-button type="submit" @click.prevent="onRegister" size="l">Submit</vs-button>
      </div>
      <div style="margin:0, auto; z-index:1000;">
        <router-link to="/" style="color:white">Login &rarr;</router-link>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { auth, usersCollection } from "../../firebase";

@Component
export default class Register extends Vue {
  email: string = "";
  password: string = "";
  username: string = "";
  isError: boolean = false;

  async onRegister() {
    if (!this.isValid) {
      this.isError = true;
    }
    this.isError = false;

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        this.email,
        this.password
      );
      if (user) {
        await usersCollection.doc(user.uid).set({
          name: this.username,
        });
      }

      this.$router.push("/main");
    } catch (e) {
      this.isError = true;
      this.email = "";
      this.password = "";
      this.username = "";
    }
  }

  private isValid(): boolean {
    return (
      this.email != "" &&
      this.password.length > 5 &&
      this.username.length > 4 &&
      this.username.length < 15
    );
  }
}
</script>

<style scoped>
.container {
  margin: 0, auto;
  margin-top: 5%;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 300px;
  justify-content: space-evenly;
}
</style>
