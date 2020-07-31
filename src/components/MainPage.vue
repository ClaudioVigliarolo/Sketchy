<template>
  <div>
    <TopBar />
    <div class="drawing-grid">
      <div class="item-draw">
        <DrawingBoard />
      </div>
      <div class="item-sidebar">
        <DrawingSettings />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TopBar from "./bars/TopBar.vue";
import DrawingBoard from "./draw/DrawingBoard.vue";
import DrawingSettings from "./draw/DrawingSettings.vue";
@Component({
  components: {
    TopBar,
    DrawingBoard,
    DrawingSettings,
  },
  created() {
    window.onbeforeunload = function () {
      return "Are You sure to leave?";
    };
  },
})
export default class MainPage extends Vue {}
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
