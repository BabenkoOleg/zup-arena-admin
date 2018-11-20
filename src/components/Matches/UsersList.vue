<template>
  <div class="users">
    <el-table :data="users" style="width: 100%">
      <el-table-column align="center" prop="steamId" label="SteamId"></el-table-column>
      <el-table-column align="center" prop="frags" label="Frags"></el-table-column>
      <el-table-column align="center" prop="team" label="Team"></el-table-column>
      <el-table-column align="center" label="Is Winner">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isWinner" type="success">Yes</el-tag>
          <el-tag v-else type="info">No</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Money Award">
        <template slot-scope="scope">
          {{scope.row.awards.money}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="XP Award">
        <template slot-scope="scope">
          {{scope.row.awards.xp}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'users-list',
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
  methods: {
  },
};
</script>
