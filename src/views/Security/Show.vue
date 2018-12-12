<template>
  <div class="security full-height">
    <el-card class="box-card full-height" v-loading="isLoading">
      <div slot="header" class="clearfix">
        Security
      </div>
    <el-form v-if="admin"
             :model="admin"
             :rules="rules"
             ref="form"
             label-width="230px">
        <el-form-item label="Login" prop="login">
          <el-input v-model="admin.login"></el-input>
        </el-form-item>
        <el-form-item label="Current password" prop="currentPassword">
          <el-input type="password" v-model="admin.currentPassword"></el-input>
        </el-form-item>
        <div class="new-password-info">
          <el-alert title="Enter a new password if you want to change the current password"
                    type="info"
                    show-icon
                    :closable="false">
          </el-alert>
        </div>
        <el-form-item label="New password" prop="newPassword">
          <el-input type="password" v-model="admin.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="New password confirmation" prop="newPasswordConfirmation">
          <el-input type="password" v-model="admin.newPasswordConfirmation"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">Save</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { actionTypes } from '@/store/modules/security';

export default {
  data() {
    return {
      isLoading: true,
      admin: null,
      rules: {
        login: [
          {
            required: true,
            message: 'Please input login',
            trigger: 'change',
          },
          {
            min: 4,
            max: 16,
            message: 'Length should be 4 to 16',
            trigger: 'change',
          },
        ],
        currentPassword: [
          {
            required: true,
            message: 'Please input current password',
            trigger: 'change',
          },
          {
            min: 8,
            max: 32,
            message: 'Length should be 8 to 32',
            trigger: 'change',
          },
        ],
        newPassword: [
          {
            min: 8,
            max: 32,
            message: 'Length should be 8 to 32',
            trigger: 'change',
          },
          {
            validator: this.newPasswordMatchingValidator,
            trigger: 'change',
          },
        ],
        newPasswordConfirmation: [
          {
            validator: this.newPasswordConfirmationMatchingValidator,
            trigger: 'change',
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions('security', [actionTypes.EDIT, actionTypes.UPDATE]),
    newPasswordMatchingValidator(rule, value, callback) {
      if (this.admin.newPasswordConfirmation) {
        this.$refs.form.validateField('newPasswordConfirmation');
      }
      callback();
    },
    newPasswordConfirmationMatchingValidator(rule, value, callback) {
      if (value !== this.admin.newPassword) {
        callback(new Error('New passwords do not match'));
      }
      callback();
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.isLoading = true;
          this[actionTypes.UPDATE]({ body: this.admin })
            .then(() => {
              this.isLoading = false;
              this.resetForm();
              this.$message({
                message: 'Credentials successfully updated',
                type: 'success',
              });
            })
            .catch(error => {
              this.isLoading = false;
              this.resetForm();
              this.$message.error(error.response.data.error);
            });
        } else {
          return false;
        }
      });
    },
    resetForm() {
      const { login } = this.admin;
      this.$refs.form.resetFields();
      this.admin.login = login;
    },
  },
  mounted() {
    this[actionTypes.EDIT]()
      .then(admin => {
        this.admin = admin;
        this.isLoading = false;
      });
  },
};
</script>

<style lang="scss" scoped>
.security {
  height: 100%;

  .new-password-info {
    padding-left: 230px;

    /deep/ .el-alert {
      margin-bottom: 22px;
    }
  }
}
</style>
