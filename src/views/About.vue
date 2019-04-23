<template>
  <div class="about">
    <h1>{{ message }}</h1>
    <h2>{{ count }}</h2>
    <h2>{{ count }} / 2 = {{ countNum }}</h2>
    <ul>
      <li v-for="item in list" :key="item.index">{{ item.name }}</li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "about",
  data() {
    return {
      message: "这是第二个"
    };
  },
  computed: {
    ...mapState(["count", "list", "countNum"])
  },
  created() {
    this.getArrList();
  },
  methods: {
    ...mapMutations([`add`, `reduce`, `getList`]),
    ...mapActions([`getList`]),
    getArrList() {
      this.getList();
    }
  }
};
</script>
