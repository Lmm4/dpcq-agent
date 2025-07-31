import request from "@/api/request.js";

// 获取代理商列表
export function getProxyList(data) {
  return request({
    url: "/admin/agentPage",
    method: "POST",
    data,
  });
}

// 新增代理
export function addProxy(data) {
  return request({
    url: "/admin/add-agent",
    method: "POST",
    data,
  });
}
