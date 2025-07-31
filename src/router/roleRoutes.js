import router from "@/router";

export const roleRoutesMap = {
  big: [
    {
      path: "equityList",
      name: "equityList",
      component: () => import("@/views/majorShareholder/equityList/index.vue"),
      meta: {
        title: "股东列表",
      },
    },
    {
      path: "equityList/monthBill",
      name: "equityList/monthBill",
      component: () => import("@/views/majorShareholder/monthBill/index.vue"),
      meta: {
        title: "月度账单",
      },
    },
  ],
  shareholder: [
    {
      path: "proxyList",
      name: "proxyList",
      component: () => import("@/views/shareholder/proxyList/index.vue"),
    },
    {
      path: "proxyList/monthBill",
      name: "proxyList/monthBill",
      component: () => import("@/views/shareholder/monthBill/index.vue"),
    },
  ],
  agent: [
    {
      path: "vipList",
      name: "vipList",
      component: () => import("@/views/agent/vipList/index.vue"),
    },
  ],
};

export async function setupRoleRoutes(role) {
  const children = roleRoutesMap[role] || [];

  children.forEach((child) => {
    router.addRoute("Layout", child);
  });
}
