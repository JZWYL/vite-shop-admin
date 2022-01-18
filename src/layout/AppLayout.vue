<template>
  <el-container>
    <el-aside>
      <AppMenuVue />
    </el-aside>
    <el-container>
      <el-header>
        <AppHeader />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import AppMenuVue from './AppMenu/AppMenu.vue'
import AppHeader from './AppHeader/index.vue'
</script>

<style lang="scss" scoped>
  .el-header {
    display: flex;
    height: 60px;
    align-items: center;
    background-color: #FFFFFF;
  }

  .el-aside {
    width: auto;
    background-color: #304156;
    color: var(--el-text-color-primary);
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #e9eef3;
    color: var(--el-text-color-primary);
  }
  .el-container {
    height: 100vh;
  }
</style>
