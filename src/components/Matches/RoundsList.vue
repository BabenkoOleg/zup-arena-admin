<template>
  <div class="rounds">
    <el-table :data="rounds" style="width: 100%">
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
      <el-table-column align="center" label="Round">
        <template slot-scope="scope">
          <el-tag type="success">#{{scope.row.number}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Time Is Up">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.timeIsUp" type="danger">Yes</el-tag>
          <el-tag v-else type="info">No</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Winning Teams">
        <template slot-scope="scope">
          {{scope.row.winningTeams.join(', ')}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'rounds-list',
  props: {
    rounds: {
      type: Array,
      required: true,
    },
  },
  methods: {
    killClass(row) {
      if (row.killer === row.target) return 'el-icon-error';
      if (row.killerTeam === row.targetTeam) return 'el-icon-warning';
      return 'el-icon-success';
    },
  },
};
</script>

<style lang="scss" scoped>
.rounds {
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
