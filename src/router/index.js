import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from "@/firebase";

Vue.use(VueRouter);

let routes = [
  {
    path: "/",
    name: "landing",
    component: () =>
      import(/* webpackChunkName: "landing" */ "@/views/Landing.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/Login.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/organizations/:orgId?",
    name: "organizations",
    component: () =>
      import(
        /* webpackChunkName: "organizations" */ "@/views/Organizations.vue"
      ),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/settings",
    name: "settings",
    component: () =>
      import(/* webpackChunkName: "settings" */ "@/views/Settings.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/accounts-user",
    name: "accounts-user",
    component: () =>
      import(
        /* webpackChunkName: "accounts-user" */ "@/views/AccountsUser.vue"
      ),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/campaign/view/:campaignId",
    name: "campaign-view",
    component: () =>
      import(
        /* webpackChunkName: "campaign-view" */ "@/views/CampaignView.vue"
      ),
  },
  {
    path: "/campaign/edit/:campaignId",
    name: "campaign-edit",
    component: () =>
      import(
        /* webpackChunkName: "campaign-edit" */ "@/views/CampaignEdit.vue"
      ),
  },
  {
    path: "/campaign/new",
    name: "campaign-new",
    component: () =>
      import(/* webpackChunkName: "campaign-new" */ "@/views/CampaignEdit.vue"),
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
