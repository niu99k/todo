<template>
  <div class="list-todos">  <!--菜单容器-->
    <a class="list-todo activeListClass list" v-for="weekDay in weekInfo"> <!--单个菜单容器-->
      <span class="icon-lock" v-if="weekDay.isLocked"></span>
      <span class="count-list" v-if="weekDay.todoCount>0">{{weekDay.todoCount}}</span>
      {{ weekDay.weekDayName }}<!--菜单内容-->
    </a>
    <a class=" link-list-new"> <!--新增菜单-->
      <span class="icon-plus">
      </span>
      新增
    </a>
  </div>
</template>
<script>
export default {
  data () {
    return {
      weekInfo: [
        {
          weekDayName: '星期一',
          todoCount: 999,
          isLocked: true
        },
        {
          weekDayName: '星期一',
          todoCount: 999,
          isLocked: true
        },
        {
          weekDayName: '星期一',
          todoCount: 999,
          isLocked: true
        },
      ]
    }
  }
}
</script>
<style lang="less">
@import '../common/style/menu.less';
</style>
