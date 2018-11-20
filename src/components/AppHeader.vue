<template>
  <el-header class="header">
    <p class="logo">Zup! Arena Admin</p>
  </el-header>
</template>

<script>
export default {
  name: 'app-header',
};
</script>

<style lang="scss" scoped>
.header {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.59);
  display: flex;
  height: 60px;
  padding: 0;
  z-index: 2;

  .logo {
    background-color: #282c31;
    color: #fff;
    font-size: 20px;
    line-height: 60px;
    margin: 0;
    padding: 0 20px;
    width: 210px;
  }
}
</style>
