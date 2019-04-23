<template>
  <div class="about">
    <h1>{{ message }}</h1>
    <h2>{{ count }}</h2>
    <h2>{{ count }} / 2 = {{ countNum }}</h2>
    <ul>
      <li v-for="item in list" :key="item.id">{{ item.title }}</li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "about",
  data() {
    return {
      message: "这是第二个"
    };
  },
  computed: {
    ...mapGetters([`countNum`]),
    ...mapState({
      count: state => state.home.count,
      list: state => state.home.list
    })
  },
  created() {
    this.getArrList();
  },
  methods: {
    ...mapActions([`getList`]),
    getArrList() {
      this.getList();
    }
  }
};
</script>
