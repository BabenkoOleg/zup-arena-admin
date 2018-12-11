<template>
  <div id="app" :class="{ auth: !isLoggedIn }">
    <el-container class="main-wrapper">
      <app-side-bar v-if="isLoggedIn"></app-side-bar>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AppSideBar from '@/components/AppSideBar';

export default {
  components: {
    AppSideBar,
  },

  computed: {
    ...mapState('auth', ['isLoggedIn']),
  },

  mounted() {
    if (this.isLoggedIn && this.$router.currentRoute.name === 'AuthIndex') {
      this.$router.push({ name: 'MatchesIndex' });
    }
  },
};
</script>

<style lang="scss">
html,
body,
#app,
.main-wrapper {
  height: 100%;
}

body {
  padding: 0;
  margin: 0;
}

.full-height {
  height: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  &.auth {
    background: #262c30;
  }

  .el-main {
    padding: 0px;

    .el-card {
      border: none;

      &.full-height {
        height: 100%;

        .el-card__body {
          height: calc(100% - 59px);
          overflow: scroll;
        }
      }

      &__body {
        padding: 20px;
      }
    }

    .el-tag {
      height: 20px;
      line-height: 18px;
    }

    .el-table {
      .el-table__header-wrapper {
        .el-table__header {
          .is-group {
            tr {
              th {
                background-color: #fff;
              }
            }
          }
        }
      }

      &__row {
        td, th {
          padding: 8px 0;
        }
      }
    }
  }
}
</style>
