import axios from "axios";
import { ElMessage, dayjs } from "element-plus";
import { localRemove } from "@/utils/local.js";

// 配置新建一个 axios 实例
const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 50000,
});

// 添加请求拦截器
request.interceptors.request.use(
  // 请求成功
  async (config) => {
    const userInfo = localStorage.getItem("userInfo");
    let token = userInfo ? JSON.parse(userInfo)?.token : null;
    if (token) {
      config.headers["authorization"] = `${token}`;
    }
    return config;
  },
  // 请求失败
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  // 响应成功
  (response) => {
    const res = response.data;
    console.log(response);
    if (response.status == 200) {
      return Promise.resolve(res);
    }
  },
  // 响应失败
  (error) => {
    console.log(error);
    if (error.message.indexOf("timeout") != -1) {
      ElMessage.error("网络超时");
    } else if (error.message == "Network Error") {
      ElMessage.error("网络连接错误");
    } else if (error.status == 401) {
      ElMessage.error("登录已过期，请重新登录");
      localRemove("userInfo");
      window.location.href = "/login";
    } else if (error.status == 418) {
      ElMessage.error("请求不通过！");
    } else if (error.status == 400) {
      ElMessage.error(error.response.data.error);
    } else {
      // ElMessage.error(error.response?.data.message);
    }
    return Promise.reject(error);
  }
);

// 导出 axios 实例
export default request;
