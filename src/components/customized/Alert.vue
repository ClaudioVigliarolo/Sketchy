<template >
  <div class="center">
    <vs-dialog v-model="active" width="80px">
      <template #header>
        <h3 class="not-margin">{{text}}</h3>
      </template>

      <template #footer>
        <div class="footer-dialog">
          <vs-button danger block @click="$emit('confirm')">Confirm</vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class DrawingBoard extends Vue {
  @Prop() active!: boolean;
  @Prop() text!: string;
}
</script>

<style lang="stylus">
getColor(vsColor, alpha = 1) {
  unquote('rgba(var(--vs-' + vsColor + '), ' + alpha + ')');
}

getVar(var) {
  unquote('var(--vs-' + var + ')');
}

.not-margin {
  margin: 0px;
  font-weight: normal;
  padding: 10px;
}

.footer-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: calc(100%);

  .new {
    margin: 0px;
    margin-top: 20px;
    padding: 0px;
    font-size: 0.7rem;

    a {
      color: getColor('primary') !important;
      margin-left: 6px;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .vs-button {
    margin: 0px;
  }
}
</style>
