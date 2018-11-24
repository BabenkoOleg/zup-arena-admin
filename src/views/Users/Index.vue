<template>
  <div class="users full-height">
    <el-card class="box-card full-height" v-loading="isLoading">
      <div slot="header" class="clearfix">
        <span>Users</span>
        <el-button style="float: right; padding: 3px 0" type="text"
                   @click="refresh">Refresh</el-button>
      </div>
      <el-table :data="users" style="width: 100%" @row-click="openMatch">
        <el-table-column align="center" prop="steamId" label="Steam Id"></el-table-column>
        <el-table-column align="center" prop="level" label="Level"></el-table-column>
        <el-table-column align="center" prop="rank" label="Rank"></el-table-column>
        <el-table-column align="center" prop="activeMatch" label="Active Match"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { actionTypes } from '@/store/modules/users';

export default {
  data() {
    return {
      isLoading: true,
      users: [],
    };
  },
  methods: {
    ...mapActions('users', [actionTypes.INDEX]),
    refresh() {
      this.isLoading = true;
      this[actionTypes.INDEX]().then((users) => {
        this.users = users;
        this.isLoading = false;
      });
    },
    openMatch(row) {
      const index = (this.users.indexOf(row));
      // this.$router.push({ name: 'UsersShow', params: { id: this.users[index].id } });
    },
  },
  mounted() {
    this.refresh();
  },
};
</script>

<style lang="scss" scoped>
.users {
  height: 100%;

  /deep/ .el-table__row {
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
