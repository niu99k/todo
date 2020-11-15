<template>
  <section class="container">
    <!--最外层容器-->
    <section class="menu">
      <menus></menus>
    </section>
    <section class="content-container"><!--右边的容器--></section>
  </section>
</template>
<script>
import menus from './menus'
export default {
  componts: {
    menus
  }
}
</script>
<style lang="less">
@import "../common/style/layouts.less";
</style>
