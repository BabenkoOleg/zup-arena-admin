<template>
  <div class="match full-height">
    <el-card class="box-card full-height" v-loading="isLoading">
      <div slot="header" class="clearfix">
        Match: <el-tag v-if="match" type="success">{{ match.id }}</el-tag>
        <el-button style="float: right; padding: 3px 0"
                   type="text"
                   @click="refresh">Refresh</el-button>
      </div>
      <el-tabs v-if="match" v-model="activeName">
        <el-tab-pane label="Users" name="users">Users</el-tab-pane>
        <el-tab-pane label="Rounds" name="rounds">
          <el-table :data="match.rounds" style="width: 100%" :show-header="false">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-table :data="props.row.kills" style="width: 100%">
                  <el-table-column align="center" prop="killer" label="Killer"></el-table-column>
                  <el-table-column align="center" prop="killerTeam" label="Team"></el-table-column>
                  <el-table-column align="center">
                    <template slot-scope="scope">
                      <i :class="killClass(scope.row)"></i>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" prop="targetTeam" label="Team"></el-table-column>
                  <el-table-column align="center" prop="target" label="Target"></el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                Round <el-tag type="success">#{{scope.row.number}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                Time Is Up:
                <el-tag v-if="scope.row.timeIsUp" type="danger">Yes</el-tag>
                <el-tag v-else type="info">No</el-tag>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                Winning Teams: {{scope.row.winningTeams.join(', ')}}
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { actionTypes } from '@/store/modules/matches';

export default {
  data() {
    return {
      activeName: 'rounds',
      isLoading: false,
      match: null,
    };
  },
  methods: {
    ...mapActions('matches', [actionTypes.SHOW]),
    refresh() {
      this.isLoading = true;
      this[actionTypes.SHOW]({ id: this.$route.params.id }).then((match) => {
        this.match = match;
        this.match.rounds = this.match.rounds.reverse();
        this.isLoading = false;
      });
    },
    killClass(row) {
      if (row.killer === row.target) return 'el-icon-error';
      if (row.killerTeam === row.targetTeam) return 'el-icon-warning';
      return 'el-icon-success';
    },
  },
  mounted() {
    this.refresh();
  },
};
</script>

<style lang="scss" scoped>
.match {
  height: 100%;

  /deep/ .el-table {
    .el-table__body-wrapper {
      .el-table__expanded-cell {
        padding: 0;

        .el-icon-success {
          color: #67c23a;
        }

        .el-icon-warning {
          color: #e6a23c;
        }

        .el-icon-error {
          color: #f56c6c;
        }
      }
    }
  }
}
</style>
