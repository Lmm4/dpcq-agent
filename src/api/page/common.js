import request from "@/api/request.js";

// 重置下级密码
export function resetShareholderPassword(data) {
  return request({
    url: "/admin/reset-sub-password",
    method: "POST",
    data,
  });
}

// 比例配置
export function deployShareholderRatio(data) {
  return request({
    url: "/admin/update-sub-profit",
    method: "POST",
    data,
  });
}

// 用户游戏数据
export function getUserGameData(data) {
  return request({
    url: "/order/gameList",
    method: "POST",
    data,
  });
}

// 获取下级分润比例
export function getShareholderRatio(data) {
  return request({
    url: "/admin/get-sub-profit",
    method: "POST",
    data,
  });
}

// 获取月度账单
export function getShareholderMonthBill(data) {
  return request({
    url: "/admin/monthBillPage",
    method: "POST",
    data,
  });
}

// 生成账单
export function generateBill(data) {
  return request({
    url: "/admin/bill",
    method: "POST",
    data,
  });
}
