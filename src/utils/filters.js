/*
 * @Author: liujinyang
 * @Date: 2019-04-23 15:12:48
 * @Last Modified by: liujinyang
 * @email: leo_1008611@163.com
 * @Last Modified time: 2019-04-23 15:15:12
 */

let DateFilters = value => {
  // yyyy-MM-dd HH:mm:ss"
  if (value) {
    let date = new Date(value);
    let y = date.getFullYear();
    let MM = date.getMonth() + 1;
    MM = MM < 10 ? "0" + MM : MM;
    let d = date.getDate();
    d = d < 10 ? "0" + d : d;
    let h = date.getHours();
    h = h < 10 ? "0" + h : h;
    let m = date.getMinutes();
    m = m < 10 ? "0" + m : m;
    let s = date.getSeconds();
    s = s < 10 ? "0" + s : s;
    return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
  } else {
    return "无";
  }
};

export default {
  DateFilters
};
