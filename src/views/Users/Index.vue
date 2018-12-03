<template>
  <div class="users full-height">
    <el-card class="box-card full-height" v-loading="isLoading">
      <div slot="header" class="clearfix">
        <span>Users</span>
        <el-button style="float: right; padding: 3px 0" type="text"
                   @click="refresh">Refresh</el-button>
      </div>
      <el-table :data="users" style="width: 100%" @row-click="openUser">
        <el-table-column align="center" label="User">
          <template slot-scope="scope">
            {{ scope.row.steamName || 'No SteamName yet' }} ({{ scope.row.steamId }})
          </template>
        </el-table-column>

        <el-table-column align="center" width="120" prop="level" label="Level">
        </el-table-column>

        <el-table-column align="center" width="120" prop="rank" label="Rank">
        </el-table-column>

        <el-table-column align="center" width="120" prop="matches" label="Matches">
        </el-table-column>

        <el-table-column align="center" width="120" prop="frags" label="Frags">
        </el-table-column>

        <el-table-column align="center" width="120" prop="money" label="Money">
        </el-table-column>

        <el-table-column align="center" width="120" prop="xp" label="XP">
        </el-table-column>

        <!-- <el-table-column align="center" width="90" label="Frags">
          <el-table-column align="center" width="90" label="Approved">
            <template slot-scope="scope">
              {{ scope.row.frags.approved }}
            </template>
          </el-table-column>

          <el-table-column align="center" width="90" label="Teammate">
            <template slot-scope="scope">
              {{ scope.row.frags.forfeits }}
            </template>
          </el-table-column>

          <el-table-column align="center" width="90" label="Suicide">
            <template slot-scope="scope">
              {{ scope.row.frags.suicides }}
            </template>
          </el-table-column>
        </el-table-column> -->
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
    openUser(row) {
      const index = (this.users.indexOf(row));
      this.$router.push({ name: 'UsersShow', params: { id: this.users[index].steamId } });
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
