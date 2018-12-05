<template>
  <div class="user full-height">
    <el-card class="box-card full-height" v-loading="isLoading">
      <div slot="header" class="clearfix">
        User: <el-tag v-if="user" type="success">{{ user.steamName }} ({{ user.steamId }})</el-tag>
        <el-button style="float: right; padding: 3px 0"
                   type="text"
                   @click="refresh">Refresh</el-button>
      </div>
      <div v-if="user" class="user-info">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>Progress</span>
              </div>
              <p>Level: <span class="field">{{ user.level }}</span></p>
              <p>Rank: <span class="field">{{ user.rank }}</span></p>
              <p>XP: <span class="field">{{ user.xp }}</span></p>
              <p>Money: <span class="field">{{ user.money }}</span></p>
            </el-card>
          </el-col>

          <el-col :span="6">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>Matches</span>
              </div>
              <p>Total: <span class="field">{{ user.matches.total }}</span></p>
              <p>Victories: <span class="field">{{ user.matches.victories }}</span></p>
              <p>Defeats: <span class="field">{{ user.matches.defeats }}</span></p>
              <p>Winning percentage: <span class="field">{{ user.matches.winningPercentage }}%</span></p>
            </el-card>
          </el-col>

          <el-col :span="12">
            <el-card class="box-card steam-info">
              <div slot="header" class="clearfix">
                <span>Info</span>
              </div>
              <div class="steam-info-fields">
                <p>Id: <span class="field">{{ user.steamId }}</span></p>
                <p>Name: <span class="field">{{ user.steamName }}</span></p>
                <p>CountryCode: <span class="field">{{ user.steamCountryCode }}</span></p>
                <p>
                  Banned:
                  <el-switch v-model="user.banned"
                             active-color="#ff4949"
                             active-text="Yes!"
                             inactive-text="No"
                             @change="changeBanned">
                  </el-switch>
                </p>
              </div>
              <div class="avatar">
                <img v-if="user.steamAvatar" :src="user.steamAvatar" alt="">
                <img v-else src="../../assets/images/default-avatar.jpg" alt="">
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
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
    ...mapActions('users', [actionTypes.SHOW, actionTypes.UPDATE]),
    refresh() {
      this.isLoading = true;
      this[actionTypes.SHOW]({ id: this.$route.params.id }).then((user) => {
        this.user = user;
        this.isLoading = false;
      });
    },
    changeBanned(value) {
      this.isLoading = true;
      this[actionTypes.UPDATE]({ id: this.user.steamId, params: { banned: value } })
        .then((user) => {
          this.user.banned = value;
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

  .user-info {
    padding: 20px 0;

    .el-row {
      margin-bottom: 20px;

      /deep/ .el-card {
        box-shadow: 0 2px 12px 0 #00000054;
        height: 100%;
        text-align: center;

        .el-card__header {
          color: #3d464d;
          font-weight: 600;
          padding: 10px;
        }

        &.steam-info {
          .el-card__body {
            align-items: center;
            display: flex;

            .steam-info-fields {
              flex-grow: 1;
            }
          }
        }
      }
    }

    .avatar {
      display: flex;
      justify-content: center;
      padding: 19px;

      img {
        height: 130px;
      }
    }

    p {
      color: #808080;

      .field {
        color: #3d464d;
        font-weight: bold;
      }
    }
  }
}
</style>
