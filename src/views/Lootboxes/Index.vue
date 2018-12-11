<template>
  <div class="lootboxes full-height">
    <el-card class="box-card full-height" v-loading="isLoading">
      <div slot="header" class="clearfix">
        <span>Lootboxes</span>
        <el-button style="float: right; padding: 3px 0" type="text"
                   @click="refresh">Refresh</el-button>
        <el-button style="float: right; padding: 3px 0; margin-right: 10px" type="text"
                   @click="create">Create new</el-button>
      </div>
      <el-table :data="lootboxes" style="width: 100%" @row-click="edit">
        <el-table-column align="center" prop="steamId" label="SteamId"></el-table-column>
        <el-table-column align="center" prop="name" label="Name"></el-table-column>
        <el-table-column align="center" prop="price" label="Price"></el-table-column>
        <el-table-column align="center" label="Reward">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.reward" type="success">Yes</el-tag>
            <el-tag v-else type="info">No</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" width="0" label="">
          <template slot-scope="scope">
            <div class="controls">
              <i class="el-icon-edit"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" width="0" label="">
          <template slot-scope="scope">
            <div class="controls">
              <i class="el-icon-delete"></i>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { actionTypes } from '@/store/modules/lootboxes';

export default {
  data() {
    return {
      isLoading: true,
      lootboxes: [],
    };
  },
  methods: {
    ...mapActions('lootboxes', [actionTypes.INDEX]),
    refresh() {
      this.isLoading = true;
      this[actionTypes.INDEX]().then((lootboxes) => {
        this.lootboxes = lootboxes;
        this.isLoading = false;
      });
    },
    edit(row) {
      const index = (this.lootboxes.indexOf(row));
      this.$router.push({ name: 'LootboxesEdit', params: { id: this.lootboxes[index].id } });
    },
    create() {
      this.$router.push({ name: 'LootboxesEdit' });
    }
  },
  mounted() {
    this.refresh();
  },
};
</script>

<style lang="scss" scoped>
.lootboxes {
  height: 100%;

  /deep/ .el-table__row {
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
