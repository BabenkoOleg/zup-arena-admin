<template>
  <el-aside width="200px">
    <div class="header">
      <p class="logo">Zup! Arena Admin</p>
    </div>
    <el-row class="tac">
      <el-col :span="24">
        <el-menu :router="true"
                 background-color="#353b41"
                 text-color="#fff"
                 active-text-color="#ffd04b">
          <el-menu-item index="/matches">Matches</el-menu-item>
          <el-menu-item index="/users">Users</el-menu-item>
          <el-menu-item index="/api-logs">API Logs</el-menu-item>
          <el-menu-item index="/lootboxes">Lootboxes</el-menu-item>
          <el-menu-item index="/security">Security</el-menu-item>
          <el-menu-item index="/sign-in" @click="signOut">Sign Out</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </el-aside>
</template>

<script>
import { mapActions } from 'vuex';
import { actionTypes } from '@/store/modules/auth';

export default {
  name: 'app-side-bar',
  methods: {
    ...mapActions('auth', [actionTypes.SIGN_OUT]),

    signOut() {
      this[actionTypes.SIGN_OUT]().then(() => {
        this.$router.push({ name: 'AuthIndex' });
        this.$message.success('Signed out successfully');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-aside {
  background-color: #353b41;
  z-index: 1;

  .header {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.59);
    display: flex;
    height: 59px;
    margin-bottom: 15px;
    padding: 0;
    z-index: 2;

    .logo {
      background-color: #282c31;
      color: #fff;
      text-align: center;
      font-size: 18px;
      line-height: 59px;
      margin: 0;
      padding: 0 20px;
      width: 160px;
    }
  }

  .el-menu {
    border-right: none;

    .el-menu-item,
    /deep/ .el-submenu__title {
      font-size: 16px;
    }
  }
}
</style>
