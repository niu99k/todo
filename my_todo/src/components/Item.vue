<template>
  <transition name="slide-fade">
  <div class="list-item  editingClass editing " :class="{checked: item.checked}" v-show="!item.isDelete"> <!-- 最外层容器-->
    <label class="checkbox"> <!--自定义的多选框-->
      <input type="checkbox" v-model="item.checked" name="checked" @change="item.locked = !item.locked;onChange" :disabled="locked">
      <span class="checkbox-custom"></span>
    </label>
    <input type="text" v-model="item.text" placeholder='写点什么。。。'  :disabled=" item.checked || locked" @keyup.enter="onChange">  <!--绑定item.text-->
    <a class="delete-item" v-if="item.checked && !locked" @click="item.isDelete = true;onChange()">
      <span class="icon-trash"></span>
    </a>
  </div>
  </transition>
</template>
<script>
import { editTodo } from '../api/api';
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          checked: false,
          text: 'hello,world'
        }
      }
    },
    'index': {
    },
    'id': {
    },
    'init': {
    },
    'locked': {
    },
  },  //子组件显式的用 props 选项声明它期待获得的数据，这里申明 它想要一个叫做 ’item‘的数据。
  methods: {
    onChange() {
      editTodo({// 用户无论删除,修改，锁定都可以利用这个方法。
        id: this.id, record: this.item, index: this.index
      }).then(data => {
        this.init();
        this.$store.dispatch('getTodo');
      });
    }
  }
};
</script>
<style lang="less">
@import '../common/style/list-items.less';
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-active {
  transform: translateX(10px);
  opacity: 0;
}
</style>
