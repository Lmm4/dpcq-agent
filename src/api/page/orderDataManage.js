import request from "@/api/request.js";

// 获取亚星注单数据列表
export function getOrderDataList(params) {
  return request({
    url: "/dp-game-yx/yx-admin/yxBetOrderPage",
    method: "GET",
    params,
  });
}

// 获取WM注单数据列表
export function getWMOrderDataList(data) {
  return request({
    url: "/dp-wm/wmGame/wmGameDataPage",
    method: "POST",
    data,
  });
}

// 获取DB真人注单数据列表
export function getDBOrderDataList(params) {
  return request({
    url: "/dp-wm/bd/history",
    method: "GET",
    params,
  });
}

// 获取FG注单数据列表
export function getFGOrderDataList(params) {
  return request({
    url: "/dp-wm/fggame/betlogs",
    method: "GET",
    params,
  });
}

// 获取9G注单数据列表
export function get9GOrderDataList(params) {
  return request({
    url: "/dp-wm/v1/9g/betlogs",
    method: "GET",
    params,
  });
}

// 获取皇冠游戏列表
export function getHgOrderDataList(type, params) {
  return request({
    url: `/dp-wm/crownGame/${type}/betLogs`,
    method: "GET",
    params,
  });
}

// 获取沙巴游戏列表
export function getShabaOrderDataList(params) {
  return request({
    url: "/dp-wm/ibc/gameData",
    method: "GET",
    params,
  });
}

// 获取DB体育游戏列表
export function getDBSportOrderDataList(params) {
  return request({
    url: "/dp-wm/bd/tyHistory",
    method: "GET",
    params,
  });
}
