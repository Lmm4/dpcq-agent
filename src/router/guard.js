import { roleRoutesMap } from "./roleRoutes";

const whiteList = ["/", "/login", "/404"];

export function setupRouterGuard(router) {
  router.beforeEach(async (to, from, next) => {
    const userInfo = localStorage.getItem("userInfo");
    let token = userInfo ? JSON.parse(userInfo)?.token : null;
    let role = userInfo ? JSON.parse(userInfo)?.role : null;

    // 白名单放行
    if (whiteList.includes(to.path)) {
      return next();
    }

    // 没登录跳登录页，避免重复redirect参数
    if (!token) {
      // 如果已经在登录页，直接放行
      if (to.path === "/login") {
        return next();
      }
      // 如果已有redirect，直接用它
      const redirect = to.query.redirect || to.fullPath;
      return next({ path: "/login", query: { redirect } });
    }

    // 登录后访问登录页跳默认首页
    if (to.path === "/login") {
      return next("/equityList"); // 这里也可以根据角色动态跳转
    }

    // 动态路由是否添加判断
    const firstRoute = roleRoutesMap[role]?.[0];
    if (firstRoute && !router.hasRoute(firstRoute.name)) {
      (roleRoutesMap[role] || []).forEach((route) => {
        router.addRoute("Layout", route);
      });
      return next({ ...to, replace: true });
    }

    // 权限校验
    const allowPaths = (roleRoutesMap[role] || []).map((r) => `/${r.path}`);
    const hasPermission = allowPaths.some((p) => to.path.startsWith(p));

    if (hasPermission) {
      return next();
    }

    // 允许访问404页面
    if (to.path === "/404") {
      return next();
    }

    return next("/404");
  });
}
