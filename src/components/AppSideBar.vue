<template>
  <el-aside width="250px">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu :router="true"
                 background-color="#353b41"
                 text-color="#fff"
                 active-text-color="#ffd04b">
          <el-menu-item index="/matches">Matches</el-menu-item>
          <el-menu-item index="/users">Users</el-menu-item>
          <el-submenu index="3">
            <template slot="title"><span>Settings</span></template>
            <el-menu-item index="1-1">Lootboxes</el-menu-item>
            <el-menu-item index="1-2">Levels</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </el-aside>
</template>

<script>
export default {
  name: 'app-side-bar',
};
</script>

<style lang="scss" scoped>
.el-aside {
  background-color: #353b41;
  padding-top: 15px;
  z-index: 1;

  .el-menu {
    border-right: none;

    .el-menu-item,
    /deep/ .el-submenu__title {
      font-size: 16px;
    }
  }
}
</style>
