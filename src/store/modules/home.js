import * as test from "@/api/test";
const state = {
  info: "为自己定一个目标, 嗯",
  msg: "一个成功的人，必定是不曾放弃的人",
  count: 0,
  num: 1,
  list: []
};
const mutations = {
  changeInfo: (state, str) => {
    state.info = str;
  },
  changeMsg: (state, str) => {
    state.msg = str;
  },
  add: (state, playload) => {
    state.count += playload.num;
  },
  reduce: (state, playload) => {
    state.count -= playload.num;
  },
  getList: (state, playload) => {
    state.list = playload.list;
  }
};
const actions = {
  changeInfo({ commit }) {
    commit("changeInfo");
  },
  changeMsg({ commit }) {
    commit("changeMsg");
  },
  // addCount({ commit }) {
  //   commit("add");
  // },
  // reduceCount({ commit }) {
  //   commit("reduce");
  // },
  getList({ commit }) {
    test.getList().then(res => {
      commit("getList", { data: res.data });
    });
  }
};
const getters = {
  countNum: state => {
    return state.count / 2;
  }
};
export default {
  state,
  mutations,
  actions,
  getters
};
