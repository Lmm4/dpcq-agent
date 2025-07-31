import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/login/index.vue";
import Layout from "@/views/layout/index.vue";
import { setupRouterGuard } from "./guard";

const constantRouterMap = [
  {
    path: "/",
    redirect: "/login", // 默认重定向到登录页
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/",
    name: "Layout", // ✅ Layout 作为主框架
    component: Layout,
    children: [], // 登录后动态添加
  },
  {
    path: "/redirect",
    component: Layout,
    meta: {
      hidden: true,
    },
    children: [
      {
        path: ":path(.*)",
        component: () => import("@/views/redirect/index.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/errorPage/404.vue"),
    meta: {
      title: "404",
    },
  },
];

const Router = createRouter({
  history: createWebHistory(),
  routes: constantRouterMap,
  scrollBehavior: (_to, _from, savedPosition) => {
    return savedPosition || { left: 0, top: 0 };
  },
});

setupRouterGuard(Router);

export default Router;
