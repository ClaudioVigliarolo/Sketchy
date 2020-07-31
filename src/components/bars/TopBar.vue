<template>
  <div class="center">
    <vs-alert
      v-if="downloadModal"
      color="dark"
      style="position:absolute; top:30%; left:50%; transform:translate(-50%, -50%); width:30%; heigth:400px; opacity:1;"
    >
      <template #title>Sketchy</template>
      <h4 style="color:white">Thanks for downloading. Your Download will start in a few seconds!</h4>
    </vs-alert>
    <Alert
      :active="resetAlert"
      @close="resetAlert=false"
      @confirm="onCanvasReset"
      text="Are You Sure to  Reset Your Drawing ?"
    />
    <Alert
      :active="logoutModal"
      @close="logoutModal=false"
      @confirm="onSignOut"
      text="Are You Sure to Sign Out ?"
    />
    <vs-navbar text-white :color="active" center-collapsed v-model="active">
      <template #left>
        <vs-tooltip bottom dark>
          <vs-button :active="active == 0" size="l" @click="resetCanvas">Reset</vs-button>
          <template #tooltip>Reset Drawing</template>
        </vs-tooltip>

        <vs-tooltip bottom dark>
          <font-awesome-icon
            @click="onColorChange"
            :icon="['fas', 'palette']"
            size="lg"
            :style="{
            color: active,
            opacity: 1,
            cursor: 'pointer',
            margin: '10px',
          }"
          />
          <template #tooltip>Change Bar Color</template>
        </vs-tooltip>
      </template>
      <template #right>
        <vs-tooltip bottom dark>
          <vs-button color="#fff" border>
            <font-awesome-icon
              @click="onCanvasDownload"
              :icon="['fas', 'arrow-down']"
              size="lg"
              :style="{
              color: 'white',
              opacity: 1,
              cursor: 'pointer',
            }"
            />
          </vs-button>
          <template #tooltip>Download as Image</template>
        </vs-tooltip>

        <vs-tooltip bottom dark>
          <vs-button :color="active" @click="logoutModal =true">Logout</vs-button>
          <template #tooltip>Sign out</template>
        </vs-tooltip>
      </template>

      <template>
        <vs-navbar-item :active="true" id="active">
          <vs-tooltip bottom dark>
            <div @click="editTitle=true" v-if="!editTitle">
              <h6>{{ title}}</h6>
            </div>
            <template v-if="!editTitle" #tooltip>Click to Edit Title</template>
          </vs-tooltip>
          <div v-if="editTitle" class="edit-title">
            <vs-input
              color="rgb(59,222,200)"
              v-model="title"
              placeholder="New"
              style="font-size: 10px !important; margin-right:10px !important;"
            />
            <div @click="onEditSubmit">
              <h6>Ok!</h6>
            </div>
          </div>
        </vs-navbar-item>
      </template>
    </vs-navbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { resetCanvas } from "../utils/boardSettings";
import { auth } from "../../firebase";
import Alert from "../customized/Alert.vue";

@Component({
  components: { Alert },
})
export default class TopBar extends Vue {
  active: string = "dark";
  title: string = "New";
  downloadModal: boolean = false;
  editTitle: boolean = false;
  logoutModal: boolean = false;
  tabNumber: number = 1;
  resetAlert: boolean = false;
  onColorChange(e: any) {
    this.resetAlert = false;
    this.tabNumber == 5
      ? (this.tabNumber = 1)
      : (this.tabNumber = this.tabNumber + 1);
    this.active = <string>this.getColor(this.tabNumber);
  }

  resetCanvas(): void {
    this.resetAlert = !this.resetAlert;
  }

  onCanvasReset(): void {
    this.resetAlert = false;
    resetCanvas();
  }

  onCanvasDownload(): void {
    this.downloadModal = true;
    const link = document.createElement("a");
    link.download = this.title + ".png";
    //@ts-ignore
    link.href = document.getElementById("c").toDataURL();
    link.click();
    setTimeout(() => {
      this.downloadModal = false;
    }, 5000);
  }
  onEditSubmit(): void {
    if (this.title) this.editTitle = false;
  }

  async onSignOut(): Promise<void> {
    this.logoutModal = false;
    await auth.signOut();
    this.$router.push("/");
  }

  getColor(n: number) {
    switch (n) {
      case 1:
        return "dark";
      case 2:
        return "success";
      case 3:
        return "danger";
      case 4:
        return "primary";
      case 5:
        return "warn";
    }
  }
}
</script>

<style scoped>
.vs-button--border:focus {
  background-color: black;
}
</style>