import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import api from "@/api";
import { auth } from "@/firebase";

import Vuesax from "vuesax";
import "vuesax/dist/vuesax.css";
import "material-icons/iconfont/material-icons.css";
import moment from "moment";
import VueCurrencyFilter from "vue-currency-filter";
import vueFilterPrettyBytes from "vue-filter-pretty-bytes";

Vue.use(Vuesax, {});
Vue.prototype.moment = moment;
Vue.use(VueCurrencyFilter, {
  symbol: "",
  thousandsSeparator: ",",
  fractionCount: 2,
  fractionSeparator: ".",
  symbolPosition: "front",
  symbolSpacing: true,
  avoidEmptyDecimals: "",
});
Vue.use(vueFilterPrettyBytes);

Vue.prototype.$api = api;

Vue.config.productionTip = false;

Vue.prototype.wait = async function (ms) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
};

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
    user.id = user.uid;
    store.dispatch("refreshUserProfile", user);
  }
});
