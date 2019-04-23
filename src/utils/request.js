// eslint-disable-line
import axios from "axios";
import qs from "qs";
// axios.defaults.retry = 4
// axios.defaults.retryDelay = 1000
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 100000 // 请求超时时间
});
// request拦截器
service.interceptors.request.use(
  config => {
    if (config.url === "login") {
      config.data = qs.stringify(config.data);
      config.headers.withCredentials = "true";
      axios.defaults.headers.post["Content-Type"] =
        "application/x-www-form-urlencoded;charset=UTF-8";
    }
    return config;
  },
  error => {
    // Do something with request error
    Promise.reject(error);
  }
);
// respone拦截器
service.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    try {
      if (error.response.status === 401) {
        alert("登录失效");
        sessionStorage.clear();
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
export default service;
