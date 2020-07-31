import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import { auth } from './firebase/index';

Vue.config.productionTip = false;

let app: any = null;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: (h) => h(App),
    }).$mount('#app');
  }
});

Vue.config.productionTip = false;

new Vue({
  router,

  render: (h) => h(App),
}).$mount('#app');
