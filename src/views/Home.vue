<template>
  <div class="home">
    <p>{{ count }}</p>
    <p>{{ msg }}</p>
    <p>{{ info }}</p>
    <button @click="addCount">+</button><button @click="reduceCount">-</button>
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <ProductionOne :products="products"></ProductionOne>
    <ProductionTwo :products="products"></ProductionTwo>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import ProductionOne from "@/components/ProductionOne.vue";
import ProductionTwo from "@/components/ProductionTwo.vue";
import { mapState, mapMutations } from "vuex";
export default {
  name: "home",
  data() {
    return {
      products: [
        { name: `鼠标`, price: 20 },
        { name: `键盘`, price: 40 },
        { name: `耳机`, price: 60 },
        { name: `显示屏`, price: 80 }
      ]
    };
  },
  computed: {
    // ...mapState(["count", "info", "msg", "list"])
    ...mapState({
      count: state => state.home.count,
      info: state => state.home.info,
      msg: state => state.home.msg,
      list: state => state.home.list
    })
  },
  components: {
    HelloWorld,
    ProductionOne,
    ProductionTwo
  },
  methods: {
    ...mapMutations([`add`, `reduce`, `getList`]),
    addCount() {
      this.$store.commit("add", { num: 10 });
    },
    reduceCount() {
      this.$store.commit("reduce", { num: 10 });
    }
  }
};
</script>
<style lang="stylus" scoped></style>
