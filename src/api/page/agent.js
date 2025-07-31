import request from "@/api/request.js";

// 获取用户列表
export function getAgentList(data) {
  return request({
    url: "/user/proxy/list",
    method: "POST",
    data,
  });
}

// 获取用户游戏数据
export function getUserGameData(data) {
  return request({
    url: "/order/userGameList",
    method: "POST",
    data,
  });
}
