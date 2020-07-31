<template>
  <div class="container">
    <div class="icons-container">
      <vs-tooltip bottom dark>
        <font-awesome-icon
          :icon="['fas', 'eraser']"
          size="2x"
          :style="{
            color: rubberSelected ? '#81f542' : 'white',
            opacity: 1,
            cursor: 'pointer',
          }"
          @click="onRubberPress"
        />
        <template #tooltip>Rubber</template>
      </vs-tooltip>
      <vs-tooltip bottom dark>
        <font-awesome-icon
          :icon="['fas', 'fill']"
          size="2x"
          @click="onBackgroundChange"
          :style="{ color: fillColor, opacity: 1, cursor: 'pointer' }"
        />
        <template #tooltip>Change background</template>
      </vs-tooltip>
    </div>
    <color-picker v-bind="color" style="width:120px; height:120px" @input="onInput"></color-picker>
    <div>
      <vue-slider
        v-model="thickValue"
        direction="btt"
        :max="200"
        :min="10"
        :dotOptions="'width:100px'"
        :process-style="{ backgroundColor: 'violet' }"
        :tooltip-style="{ backgroundColor: 'blue', borderColor: 'blue' }"
        style="position: absolute;
        top: 350px;
        left: 50%;
        transform: translate(-50%, -50%);height: 300px;"
      >
        <template v-slot:dot="{ thickValue, focus }">
          <div :class="['custom-dot', { focus }]"></div>
        </template>
      </vue-slider>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import {
  setHeight,
  setWidth,
  getBackground,
  setThickness,
  setColor,
  toggleEraser,
  setBackground,
} from "../utils/boardSettings";
//@ts-ignore
import ColorPicker from "@radial-color-picker/vue-color-picker";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
const NUMBER_COLORS = 7;
@Component({
  components: {
    VueSlider,
    ColorPicker,
  },
})
export default class DrawingSettings extends Vue {
  @Watch("thickValue")
  onPropertyChanged(newVal: number, oldValue: string) {
    setThickness(newVal / 10);
  }

  thickValue: number = 100;
  backgroundNumber: number = 1;
  fillColor: string = getBackground();
  picker: boolean = false;
  colors: string = "#194d33";
  rubberSelected: boolean = false;

  color = {
    hue: 50,
    saturation: 100,
    luminosity: 50,
    alpha: 1,
  };
  private options: any = {
    selectedColor: "",
    selectedSize: "",
  };
  created(): void {
    setWidth((document.documentElement.clientWidth * 9) / 10);
    setHeight(1000);
    setBackground(this.getColor(this.backgroundNumber));
  }

  onBackgroundChange(): void {
    this.backgroundNumber = this.backgroundNumber + 1;
    this.backgroundNumber == NUMBER_COLORS
      ? (this.backgroundNumber = 1)
      : this.backgroundNumber + 1;
    let newColor = this.getColor(this.backgroundNumber);
    this.fillColor = newColor;
    setBackground(newColor);
  }

  getColor(n: number): string {
    switch (n) {
      case 1:
        return "#001f3f";
      case 2:
        return "#fff";
      case 3:
        return "#FF851B";
      case 4:
        return "blue";
      case 5:
        return "#85144b";
      case 6:
        return "#F012BE";
      case 7:
        return "#B10DC9";

      default:
        return "#001f3f";
    }
  }

  onInput(hue: number): void {
    this.color.hue = hue;
    setColor(`hsla(${this.color.hue}, 100%, 50%, 1)`);
  }

  onRubberPress(): void {
    this.rubberSelected = !this.rubberSelected;
    toggleEraser();
  }
}
</script>

<style scoped>
@import "~@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css";
.container {
  width: 100px;
  height: 100px;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.icons-container {
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 150px;
  left: 50%;
  top: 12%;
  transform: translate(-50%, -50%);
  right: 0px;
}

.custom-dot {
  width: 100%;
  height: 100%;
  border-radius: 0;
  background-color: white;
  transition: all 0.3s;
}
.custom-dot:hover {
  transform: rotateZ(45deg);
}
.custom-dot.focus {
  border-radius: 50%;
}
</style>
