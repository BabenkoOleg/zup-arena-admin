<template>
  <div id="app" :class="{ auth: !isLoggedIn }">
    <el-container class="is-vertical">
      <app-header v-if="isLoggedIn"></app-header>
      <el-container>
        <app-side-bar v-if="isLoggedIn"></app-side-bar>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AppHeader from '@/components/AppHeader';
import AppSideBar from '@/components/AppSideBar';
import { actionTypes as authActionTypes } from '@/store/modules/auth';


export default {
  components: {
    AppHeader,
    AppSideBar,
  },

  computed: {
    ...mapState('auth', ['isLoggedIn']),
  },

  mounted() {
    if (this.isLoggedIn && this.$router.currentRoute.name === 'AuthIndex') {
      this.$router.push({ name: 'MatchesIndex' });
    }
  }
};
</script>

<style lang="scss">
html,
body,
#app,
.is-vertical {
  height: 100%;
}

body {
  padding: 0;
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  &.auth {
    background: #262c30;
  }

  /deep/ .el-main {
    .full-height {
      height: 100%;
    }

    .el-card {
      border: 1px solid #353b412e;

      &.full-height {
        height: 100%;

        .el-card__body {
          height: calc(100% - 59px);
          overflow: scroll;
        }
      }

      &__body {
        padding: 0 20px;
      }
    }

    .el-tag {
      height: 20px;
      line-height: 18px;
    }

    .el-table {
      &__row {
        td, th {
          padding: 8px 0;
        }
      }
    }
  }
}
</style>
