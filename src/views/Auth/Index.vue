<template>
  <div class="sign-in full-height">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>SignIn</span>
      </div>
      <el-form :model="form" ref="form" status-icon :rules="rules" @validate="validate">
        <div class="inputs">
          <el-form-item label="Login" prop="login">
            <el-input type="text"
                      v-model="form.login"
                      autocomplete="off"
                      @input="validateField('login')">
            </el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input type="password"
                      v-model="form.password"
                      autocomplete="off"
                      @input="validateField('password')">
            </el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="success"
                     :disabled="!isValid"
                     :loading="isLoading"
                     @click="signIn">
            Sign In
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { actionTypes as authActionTypes } from '@/store/modules/auth';

export default {
  data() {
    return {
      form: {
        login: '',
        password: '',
      },
      rules: {
        login: [
          { required: true, message: 'Please input login', trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'Please input password', trigger: 'blur' },
          { min: 8, message: 'Must not be less than 8 characters', trigger: 'blur' },
        ],
      },
      isLoading: false,
      isLoginValid: false,
      isPasswordValid: false,
    };
  },
  computed: {
    isValid() {
      return this.isLoginValid && this.isPasswordValid;
    },
  },
  methods: {
    ...mapActions('auth', [authActionTypes.SIGN_IN]),

    signIn() {
      this.isLoading = true;
      this[authActionTypes.SIGN_IN]({
        login: this.form.login,
        password: this.form.password,
      }).then((message) => {
        this.isLoading = false;
        this.$message({ message, type: 'success' });
        this.$router.push({ name: 'MatchesIndex' });
      }).catch((error) => {
        this.isLoading = false;
        this.$message({ message: error.response.data.error, type: 'error' });
      });
    },
    validateField(field) {
      this.$refs.form.validateField(field);
    },
    validate(field, value) {
      if (field === 'login') return this.isLoginValid = value;
      if (field === 'password') return this.isPasswordValid = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.sign-in {
  align-items: center;
  display: flex;
  justify-content: center;

  /deep/ .el-card {
    width: 350px;

    .el-card__body {
      padding: 10px 20px 0 !important;

      .el-form {
        .inputs {
          margin-bottom: 40px;
        }

        .el-button {
          width: 100%;
        }
      }
    }
  }
}
</style>
