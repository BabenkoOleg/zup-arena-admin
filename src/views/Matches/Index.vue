<template>
  <div class="matches full-height">
    <el-card class="box-card full-height" v-loading="isLoading">
      <div slot="header" class="clearfix">
        <span>Matches</span>
        <el-button style="float: right; padding: 3px 0" type="text"
                   @click="refresh">Refresh</el-button>
      </div>
      <el-table :data="matches" style="width: 100%" @row-click="openMatch">
        <el-table-column align="center" prop="id" label="Id"></el-table-column>
        <el-table-column align="center" label="State">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.state === 'active'"
                    type="success">{{ scope.row.state }}</el-tag>
            <el-tag v-else type="info">{{ scope.row.state }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Date">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ $toDate(scope.row.createdAt) }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { actionTypes } from '@/store/modules/matches';

export default {
  data() {
    return {
      isLoading: true,
      matches: [],
    };
  },
  methods: {
    ...mapActions('matches', [actionTypes.INDEX]),
    refresh() {
      this.isLoading = true;
      this[actionTypes.INDEX]().then((matches) => {
        this.matches = matches;
        this.isLoading = false;
      });
    },
    openMatch(row) {
      const index = (this.matches.indexOf(row));
      this.$router.push({ name: 'MatchesShow', params: { id: this.matches[index].id } });
    },
  },
  mounted() {
    this.refresh();
  },
};
</script>

<style lang="scss" scoped>
.matches {
  height: 100%;

  /deep/ .el-table__row {
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
