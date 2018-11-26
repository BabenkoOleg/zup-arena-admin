<template>
  <div class="user full-height">
    <el-card class="box-card full-height" v-loading="isLoading">
      <div slot="header" class="clearfix">
        User: <el-tag v-if="user" type="success">{{ user.steamId }}</el-tag>
        <el-button style="float: right; padding: 3px 0"
                   type="text"
                   @click="refresh">Refresh</el-button>
      </div>
      <el-tabs v-if="user" v-model="activeName">
        <!-- <el-tab-pane label="Users" name="users">
          <users-list :users="user.users"></users-list>
        </el-tab-pane>
        <el-tab-pane label="Rounds" name="rounds">
          <rounds-list :rounds="user.rounds"></rounds-list>
        </el-tab-pane> -->
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { actionTypes } from '@/store/modules/users';

export default {
  data() {
    return {
      activeName: 'users',
      isLoading: false,
      user: null,
    };
  },
  methods: {
    ...mapActions('users', [actionTypes.SHOW]),
    refresh() {
      this.isLoading = true;
      this[actionTypes.SHOW]({ id: this.$route.params.id }).then((user) => {
        this.user = user;
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
.user {
  height: 100%;
}
</style>
