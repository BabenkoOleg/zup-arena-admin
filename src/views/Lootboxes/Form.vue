<template>
  <div class="lootbox full-height">
    <el-card class="box-card full-height" v-loading="isLoading">
      <div slot="header" class="clearfix">
        {{ id ? 'Edit lootbox' : 'Create lootbox' }}
        <el-button v-if="id"
                   style="float: right; padding: 3px 0"
                   type="text"
                   @click="deleteDialog">
          Delete
        </el-button>
      </div>
      <el-form v-if="lootbox"
               :model="lootbox"
               :rules="rules"
               ref="form"
               label-width="120px">
        <el-form-item label="SteamId" prop="steamId">
          <el-input type="number" v-model="lootbox.steamId"></el-input>
        </el-form-item>
        <el-form-item label="Name" prop="name">
          <el-input v-model="lootbox.name"></el-input>
        </el-form-item>
        <el-form-item label="Price" prop="price">
          <el-input type="number" v-model="lootbox.price"></el-input>
        </el-form-item>
        <el-form-item label="Reward">
          <label slot="label">
            <el-popover width="200"
                        trigger="hover"
                        content="Can be awarded to a player as a reward for the level up">
              <i slot="reference" class="el-icon-info"></i>
            </el-popover>
            Reward
          </label>
          <el-switch v-model="lootbox.reward"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">
            {{ id ? 'Save' : 'Create' }}
          </el-button>
          <el-button @click="$router.go(-1)">Cansel</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog  title="Warning" :visible.sync="isDeleteDialogVisible" width="30%" center>
      <span>Are you sure you want to delete lootbox?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDeleteDialogVisible = false">Cancel</el-button>
        <el-button type="danger" @click="deleteConfirm">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { actionTypes } from '@/store/modules/lootboxes';

export default {
  name: 'lootbox-form',
  data() {
    return {
      isLoading: true,
      isDeleteDialogVisible: false,
      lootbox: {},
      rules: {
        steamId: [
          { required: true, message: 'Please input SteamId', trigger: 'blur' },
        ],
        name: [
          { required: true, message: 'Please input name', trigger: 'blur' },
        ],
        price: [
          { required: true, message: 'Please input price', trigger: 'blur' },
        ],
      },
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapActions('lootboxes', [
        actionTypes.NEW,
        actionTypes.CREATE,
        actionTypes.EDIT,
        actionTypes.UPDATE,
        actionTypes.DESTROY,
      ]),

    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let request = null;

          if (this.id) {
            request = this[actionTypes.UPDATE]({ id: this.id, body: this.lootbox });
          } else {
            request = this[actionTypes.CREATE]({ body: this.lootbox });
          }

          request.then(() => {
            this.$message({
              message: `Lootbox successfully ${this.id ? 'updated' : 'created' }`,
              type: 'success',
            });
            this.$router.push({ name: 'LootboxesIndex' });
          });
        } else {
          return false;
        }
      });
    },

    deleteDialog() {
      this.isDeleteDialogVisible = true;
    },

    deleteConfirm() {
      this[actionTypes.DESTROY]({ id: this.id })
        .then(() => {
          this.isDeleteDialogVisible = false;
          this.$message({ message: 'Lootbox successfully deleted', type: 'success' });
          this.$router.push({ name: 'LootboxesIndex' });
        });
    },
  },
  mounted() {
    const request = this.id ? this[actionTypes.EDIT]({ id: this.id }) : this[actionTypes.NEW]();
    request.then(lootbox => {
      this.lootbox = lootbox;
      this.isLoading = false;
    });
  },
};
</script>

<style lang="scss" scoped>
.lootbox {
  /deep/ .el-dialog__wrapper {
    .el-dialog {
      .el-dialog__body {
        text-align: center;
      }
    }
  }
}
</style>
