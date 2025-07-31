import request from "@/api/request.js";

// 获取股东列表
export function getShareholderList(data) {
  return request({
    url: "/admin/managePage",
    method: "POST",
    data,
  });
}

// 新增股东
export function addShareholder(data) {
  return request({
    url: "/admin/add-shareholder",
    method: "POST",
    data,
  });
}
