import request from "@/api/request.js";

// 登录
export function login(data) {
  return request({
    url: "/admin/login",
    method: "POST",
    data,
  });
}
