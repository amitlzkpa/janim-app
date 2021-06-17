import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from "@/firebase";

Vue.use(VueRouter);

let routes = [
  {
    path: "/",
    name: "Vyrall",
    component: () =>
      import(/* webpackChunkName: "landing" */ "@/views/Landing.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/Login.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/organizations",
    name: "Organizations",
    component: () =>
      import(/* webpackChunkName: "settings" */ "@/views/Organizations.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/settings",
    name: "Settings",
    component: () =>
      import(/* webpackChunkName: "settings" */ "@/views/Settings.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/campaign/view/:campaignId",
    name: "Vyrall Campaign | View",
    component: () =>
      import(/* webpackChunkName: "campaign-view */ "@/views/CampaignView.vue"),
  },
  {
    path: "/campaign/edit/:campaignId?",
    name: "Vyrall Campaign | Edit",
    component: () =>
      import(/* webpackChunkName: "campaign-edit */ "@/views/CampaignEdit.vue"),
  },
];

let router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some((x) => x.meta.requiresAuth);

  if (requiresAuth && !auth.currentUser) {
    next("/login");
  } else {
    next();
  }
});

export default router;
