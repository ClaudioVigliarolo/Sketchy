<template>
  <form>
    <img src="../../style/sfondo3.svg" id="bg2" alt />
    <img src="../../style/logo.svg" class="logo" alt />
    <div class="container">
      <div class="center content-inputs">
        <vs-input
          label="email"
          v-model="email"
          placeholder="Invalid"
          style="color:white"
          :style=" isError ? 'color:red; ' : 'color:white; ;'"
        />
      </div>
      <div class="center content-inputs">
        <vs-input
          label="Password"
          type="password"
          v-model="password"
          placeholder="Invalid"
          :style=" isError ? 'color:red; ' : 'color:white; ;'"
        />
      </div>

      <div>
        <vs-button type="submit" @click.prevent="onLogin" size="l">Submit</vs-button>
      </div>

      <div style="margin:0, auto; z-index:1000;">
        <router-link to="register" style="color:white">Registration &rarr;</router-link>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { auth } from "../../firebase";
@Component
export default class Login extends Vue {
  email: string = "";
  password: string = "";
  isError: boolean = false;

  async onLogin() {
    if (!this.isValid()) {
      this.isError = true;
      return;
    }
    this.isError = false;
    try {
      await auth.signInWithEmailAndPassword(this.email, this.password);
      this.$router.push("/main");
    } catch (e) {
      this.isError = true;
      this.email = "";
      this.password = "";
    }
  }

  private isValid(): boolean {
    return this.email != "" && this.password != "";
  }
}
</script>

<style scoped>
.container {
  margin: 0, auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 300px;
  justify-content: space-evenly;
}
</style>
