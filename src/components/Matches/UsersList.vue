<template>
  <div class="users">
    <el-table :data="users" style="width: 100%">
      <el-table-column align="center" label="User">
        <template slot-scope="scope">
          {{ scope.row.steamName || 'SteamName not yet received' }}<br>
          {{ scope.row.steamId }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="Frags">
        <el-table-column align="center" width="100" label="Enemies">
          <template slot-scope="scope">
            {{ scope.row.frags.enemies }}
          </template>
        </el-table-column>

        <el-table-column align="center" width="100" label="Teammates">
          <template slot-scope="scope">
            {{ scope.row.frags.teammates }}
          </template>
        </el-table-column>

        <el-table-column align="center" width="100" label="Suicides">
          <template slot-scope="scope">
            {{ scope.row.frags.suicides }}
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column align="center" prop="team" width="70" label="Team"></el-table-column>

      <el-table-column align="center" width="70" label="Left">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.left" type="danger">Yes</el-tag>
          <el-tag v-else type="info">No</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" width="70" label="Winner">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isWinner" type="success">Yes</el-tag>
          <el-tag v-else type="info">No</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Awards">
        <el-table-column align="center" label="Money">
          <el-table-column align="center" width="70" label="Victory">
            <template slot-scope="scope">
              {{ scope.row.awards.money.victory }}
            </template>
          </el-table-column>

          <el-table-column align="center" width="70" label="Defeat">
            <template slot-scope="scope">
              {{ scope.row.awards.money.defeat }}
            </template>
          </el-table-column>

          <el-table-column align="center" width="70" label="Frags">
            <template slot-scope="scope">
              {{ scope.row.awards.money.frags }}
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column align="center" label="Xp">
          <el-table-column align="center" width="70" label="Victory">
            <template slot-scope="scope">
              {{ scope.row.awards.xp.victory }}
            </template>
          </el-table-column>

          <el-table-column align="center" width="70" label="Defeat">
            <template slot-scope="scope">
              {{ scope.row.awards.xp.defeat }}
            </template>
          </el-table-column>

          <el-table-column align="center" width="70" label="Frags">
            <template slot-scope="scope">
              {{ scope.row.awards.xp.frags }}
            </template>
          </el-table-column>
        </el-table-column>
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
};
</script>
