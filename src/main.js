import Vue from "vue";
import vuetify from "@/plugins/vuetify";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import api from "@/api";
import utils from "@/utils";
import { auth } from "@/firebase";

import moment from "moment";
import VueCurrencyFilter from "vue-currency-filter";
import vueFilterPrettyBytes from "vue-filter-pretty-bytes";

Vue.config.productionTip = false;
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
Vue.prototype.$utils = utils;

Vue.prototype.wait = utils.wait;

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
    user.id = user.uid;
    store.dispatch("refreshUserProfile", user);
  }
});
