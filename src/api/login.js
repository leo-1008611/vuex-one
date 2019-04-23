import request from "@/utils/request";
// 登录
export function logindata(data) {
  return request({
    url: "login",
    method: "post",
    data
  });
}
