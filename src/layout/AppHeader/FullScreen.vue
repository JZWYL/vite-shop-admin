<template>
  <el-icon @click="handleFullScreen">
    <FullScreen />
  </el-icon>
</template>

<script lang="ts" setup>
import { FullScreen } from '@element-plus/icons-vue'

const handleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
