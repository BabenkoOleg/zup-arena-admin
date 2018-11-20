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
        <el-tab-pane label="Users" name="users">
          <users-list :users="match.users"></users-list>
        </el-tab-pane>
        <el-tab-pane label="Rounds" name="rounds">
          <rounds-list :rounds="match.rounds"></rounds-list>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { actionTypes } from '@/store/modules/matches';
import RoundsList from '@/components/Matches/RoundsList';
import UsersList from '@/components/Matches/UsersList';

export default {
  data() {
    return {
      activeName: 'rounds',
      isLoading: false,
      match: null,
    };
  },
  components: {
    RoundsList,
    UsersList,
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
  },
  mounted() {
    this.refresh();
  },
};
</script>

<style lang="scss" scoped>
.match {
  height: 100%;

  // /deep/ .el-table {
  //   .el-table__body-wrapper {
  //     .el-table__expanded-cell {
  //       padding: 0;

  //       .el-icon-success {
  //         color: #67c23a;
  //       }

  //       .el-icon-warning {
  //         color: #e6a23c;
  //       }

  //       .el-icon-error {
  //         color: #f56c6c;
  //       }
  //     }
  //   }
  // }
}
</style>
