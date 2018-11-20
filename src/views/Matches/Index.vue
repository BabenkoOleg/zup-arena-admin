<template>
  <div class="matches">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Matches</span>
        <el-button style="float: right; padding: 3px 0" type="text">Refresh</el-button>
      </div>
      <el-table :data="matches" style="width: 100%">
        <el-table-column prop="id" label="Id"></el-table-column>
        <el-table-column label="State">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.state === 'active'"
                    type="success">{{ scope.row.state }}</el-tag>
            <el-tag v-else type="info">{{ scope.row.state }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Date">
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
import { mapActions, mapState } from 'vuex';
import { actionTypes } from '@/store/modules/matches';

export default {
  computed: {
    ...mapState('matches', ['matches']),
  },
  methods: {
    ...mapActions('matches', [actionTypes.INDEX]),
  },
  mounted() {
    this[actionTypes.INDEX]({ page: 1 });
  },
};
</script>
