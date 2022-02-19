import Vue from "vue";
import vuetify from "@/plugins/vuetify";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import { auth } from "@/firebase";
import moment from "moment";

Vue.config.productionTip = false;
Vue.prototype.moment = moment;

let app;
auth.onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App),
    }).$mount("#app");
  }

  if (user) {
    store.dispatch("fetchUserProfile", user);
  }
});
