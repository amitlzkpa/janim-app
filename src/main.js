import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import { auth } from "@/firebase";

import Vuesax from "vuesax";
import "vuesax/dist/vuesax.css";
import "material-icons/iconfont/material-icons.css";
import moment from "moment";
import vueFilterPrettyBytes from "vue-filter-pretty-bytes";

Vue.use(Vuesax, {});
Vue.prototype.moment = moment;
Vue.use(vueFilterPrettyBytes);

Vue.config.productionTip = false;

let app;
auth.onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }

  if (user) {
    store.dispatch("refreshUserProfile", user);
  }
});
