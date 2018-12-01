<template>
  <div class="api-logs full-height">
    <el-card class="box-card full-height" v-loading="isLoading">
      <div slot="header" class="clearfix">
        <span>API Logs</span>
        <el-button style="float: right; padding: 3px 0" type="text"
                   @click="refresh">Refresh</el-button>
      </div>
      <el-table :data="apiLogs" style="width: 100%" @row-click="openApiLog">
        <el-table-column align="center" width="100" label="Code">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.statusCode < 400"
                    type="success">{{ scope.row.statusCode }}</el-tag>
            <el-tag v-else type="error">{{ scope.row.statusCode }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" width="100" prop="method" label="Method"></el-table-column>
        <el-table-column align="center" prop="path" label="Path"></el-table-column>
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
import { actionTypes } from '@/store/modules/apiLogs';

export default {
  data() {
    return {
      isLoading: true,
      apiLogs: [],
    };
  },
  methods: {
    ...mapActions('apiLogs', [actionTypes.INDEX]),
    refresh() {
      this.isLoading = true;
      this[actionTypes.INDEX]().then((apiLogs) => {
        this.apiLogs = apiLogs;
        this.isLoading = false;
      });
    },
    openApiLog(row) {
      const index = (this.apiLogs.indexOf(row));
      this.$router.push({ name: 'ApiLogsShow', params: { id: this.apiLogs[index].id } });
    },
  },
  mounted() {
    this.refresh();
  },
};
</script>

<style lang="scss" scoped>
.api-logs {
  height: 100%;

  /deep/ .el-table__row {
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
