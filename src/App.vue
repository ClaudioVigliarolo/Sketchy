<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

//@ts-ignore
import Vuesax from "vuesax";
import Login from "../src/components/auth/Login.vue";
import "vuesax/dist/vuesax.css"; //Vuesax styles

library.add(fas);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(Vuesax);
@Component({
  components: {
    Login,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import "./style/theme";
</style>

