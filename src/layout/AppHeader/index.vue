<template>
  <div class="header">
    <div class="left">
      <div class="item">
        <ToggleSidebar />
      </div>
      <div class="item">
        <Breadcrumb />
      </div>
    </div>

    <div class="right">
      <div class="item">
        <MenuSearch />
      </div>
      <div class="item">
        <FullScreen />
      </div>
      <div class="item">
        <Notification />
      </div>
      <div class="item">
        <UserInfo />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ToggleSidebar from './ToggleSidebar.vue'
import Breadcrumb from './Breadcrumb.vue'
import MenuSearch from './MenuSearch.vue'
import FullScreen from './FullScreen.vue'
import Notification from './Notification.vue'
import UserInfo from './UserInfo.vue'
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 60px;
  // line-height: 60px;
  .left {
    display: flex;
  }
  .right {
    display: flex;
  }
  .item {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
}
</style>
