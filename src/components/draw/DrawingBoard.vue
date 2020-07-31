<template>
  <div class="main">
    <canvas ref="c" id="c" v-canvas></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import canvas from "../utils/canvas.directive";
import { setRef} from "../utils/boardSettings";

@Component({
  directives: { canvas },
})
export default class DrawingBoard extends Vue {
  created() {
    setRef(this.$refs);
  }
}
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;
}
</style>
