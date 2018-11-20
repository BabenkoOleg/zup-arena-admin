<template>
  <div id="app">
    <el-container class="is-vertical">
      <app-header></app-header>
      <el-container>
        <app-side-bar></app-side-bar>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader';
import AppSideBar from '@/components/AppSideBar';

export default {
  components: {
    AppHeader,
    AppSideBar,
  },
};
</script>

<style lang="scss">
html,
body,
#app,
.is-vertical {
  height: 100%;
}

body {
  padding: 0;
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /deep/ .el-main {
    .el-card {
      border: 1px solid #353b412e;
    }

    .el-tag {
      height: 20px;
      line-height: 18px;
    }

    .el-table {
      .el-table__row {
        td, th {
          padding: 8px 0;
        }
      }
    }
  }
}
</style>
