<template>
  <div class="wrap">
    <div>
      <el-tree
        :data="data"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        :check-strictly="true"
        @check-change="changeChecks"
        highlight-current
        :props="defaultProps"
      >
      </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  name: "treeComponents",
  data() {
    return {
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    changeChecks(data, node) {
      console.log(data);
      console.log(node);
    }
  }
};
</script>

<style scoped lang="stylus">
.wrap
  width: 1200px;
  box-shadow: 2px 2px 13px 2px #000;
  margin: 0 auto;
  min-height: 100px;
  margin-bottom: 10px;
  padding-bottom: 20px;
</style>
