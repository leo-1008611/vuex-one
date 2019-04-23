import request from "@/utils/request";
export function getList() {
  return request({
    url:
      "https://www.easy-mock.com/mock/5c259233c2518a5416c67c09/example_copy/handleList",
    method: "post"
  });
}
