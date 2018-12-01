<template>
  <div class="apiLog full-height">
    <el-card class="box-card full-height" v-loading="isLoading">
      <div slot="header" class="clearfix">
        ApiLog: <el-tag v-if="apiLog" type="success">{{ apiLog.id }}</el-tag>
        <el-button style="float: right; padding: 3px 0"
                   type="text"
                   @click="refresh">Refresh</el-button>
      </div>
      <template v-if="apiLog">
        <p>
          <span class="field">Path:</span><el-tag type="info">{{ apiLog.path }}</el-tag>
        </p>
        <p>
          <span class="field">Method:</span><el-tag type="info">{{ apiLog.method }}</el-tag>
        </p>
        <p>
          <span class="field">Response status code:</span>
          <el-tag v-if="apiLog.statusCode < 400" type="success">{{ apiLog.statusCode }}</el-tag>
          <el-tag v-else type="error">{{ apiLog.statusCode }}</el-tag>
        </p>
        <el-collapse>
          <el-collapse-item title="Request Headers" name="1">
            <pre class="json">{{JSON.stringify(apiLog.requestHeaders, null, 4)}}</pre>
          </el-collapse-item>
          <el-collapse-item title="Request Body" name="2">
            <pre class="json">{{JSON.stringify(apiLog.requestBody, null, 4)}}</pre>
          </el-collapse-item>
          <el-collapse-item title="Response Headers" name="3">
            <pre class="json">{{JSON.stringify(apiLog.responseHeaders, null, 4)}}</pre>
          </el-collapse-item>
          <el-collapse-item title="Response Body" name="4">
            <pre class="json">{{JSON.stringify(apiLog.responseBody, null, 4)}}</pre>
          </el-collapse-item>
        </el-collapse>
      </template>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { actionTypes } from '@/store/modules/apiLogs';

export default {
  data() {
    return {
      activeName: 'users',
      isLoading: false,
      apiLog: null,
    };
  },
  methods: {
    ...mapActions('apiLogs', [actionTypes.SHOW]),
    refresh() {
      this.isLoading = true;
      this[actionTypes.SHOW]({ id: this.$route.params.id }).then((apiLog) => {
        this.apiLog = apiLog;
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
.apiLog {
  height: 100%;

  /deep/ .el-card {
    .el-card__body {
      .field {
        display: inline-block;
        width: 180px;
      }

      .json {
        background: #000;
        border-radius: 4px;
        color: #65B042;
        font-weight: bold;
        overflow: scroll;
        padding: 10px;
      }
    }
  }
}
</style>
