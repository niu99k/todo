<template>
  <div class="page lists-show" v-show="!isDeleted"><!--最外层容器-->
    <nav><!--容器上半部分-->
      <div class="form list-edit-form" v-show="isUpdate">
        <!-- 当用户点击标题进入修改状态，就显示当前内容可以修改 -->
        <input type="text" v-model="todo.title" @keyup.enter="updateTitle" :disabled="todo.locked">
        <div class="nav-group right">
          <a class="nav-item" @click="isUpdate = false">
            <span class="icon-close">
            </span>
          </a>
        </div>
      </div>
      <div class="nav-group" @click="$store.dispatch('updateMenu')" v-show="!isUpdate">
        <!-- 在菜单的图标下面添加updateMenu时间，他可以直接调用vuex actions.js里面的updateMenu方法 -->
        <a class="nav-item">
          <span class="icon-list-unordered">
          </span>
        </a>
      </div>
      <h1 class="title-page" v-show="!isUpdate" @click="isUpdate = true">
        <span class="title-wrapper">{{ todo.title }}</span> <!-- 标题-->
        <span class="count-list">{{ todo.count }}</span><!-- 数目-->
      </h1>
      <div class="nav-group right" v-show="!isUpdate">
        <div class="options-web">
          <a class=" nav-item" @click="onlock"> <!-- 锁定图标-->
            <span class="icon-lock" v-if="todo.locked"></span>
            <span class="icon-unlock" v-else>
            </span>
          </a>
          <a class=" nav-item"><!-- 删除图标-->
            <span class="icon-trash" @click="onDelete">
            </span>
          </a>
        </div>
      </div>

      <div class=" form todo-new input-symbol">
        <!-- 新增单个代办单项输入框,监听了回车事件，双向绑定text值,监听了disabled属性，在todo.locked为true的情况下无法编辑-->
        <input type="text" v-model="text" placeholder='请输入' @keyup.enter="onAdd" :disabled="todo.locked"/>
        <span class="icon-add"></span>
      </div>
    </nav>
    <div class="content-scrollable list-items">
      <div v-for="item in items"> <!-- 这里`v-for`会循环我们在 `data`函数 事先定义好的 ’items‘模拟数据，循环后拿到单个对象，在通过prop把数据传输给子组件 item -->
        <item :item="item"></item>
      </div>
    </div>
  </div>
</template>
<script>
import item from './Item'
import {detailsList, addOneTodoDetails, editTodo} from "../api/api";

let todoId = ''
export default {
  watch: {
    "$route.params.id"() {
      todoId = this.$route.params.id
      this.initWithTodoId(todoId)
      this.isDeleted=false
    }
  },
  created() {
    if (todoId != '') {
      this.initWithTodoId(todoId)
    }
  },
  components: {
    item
  },
  data() {
    return {
      todo: {
        title: '', // 标题
        count: 0, // 数量
        locked: false ,// 是否绑定
        isDeleted:true
      },
      items: [  // 代办单项列表
      ],
      text: '', // 用户输入单项项绑定的输入
      isUpdate: false, // 新增修改状态
      isDeleted:false
    };
  },
  methods: {
    onAdd() {
      addOneTodoDetails({id: todoId, text: (this.text)}).then(res => {
        this.text = ''
        this.initWithTodoId(todoId)
      })
    },
    initWithTodoId(todoId) {
      const todoDetailsId = todoId;
      detailsList({id: todoDetailsId}).then(res => {
        let {id, title, count, isDeleted, locked, record} = res.data.todo;
        this.items = record
        this.todo = {
          id: id,
          title: title,
          count: count,
          locked: locked,
          isDeleted: isDeleted
        }
        console.log(isDeleted)
      })
    },
    updateTodo() {
      let _this = this;
      editTodo({
        todo: this.todo
      }).then(data => {
        _this.$store.dispatch('getTodo');
        _this.initWithTodoId(todoId);
      });
    },
    updateTitle() {
      debugger;
      this.updateTodo();
      this.isUpdate = false;
    },
    onlock() {
      this.todo.locked = !this.todo.locked;
      this.updateTodo();
    },
    onDelete() {
      this.todo.isDelete = true;
      this.isDeleted=true
      this.updateTodo();
    }
  }
}
</script>
<style lang="less">
@import '../common/style/nav.less';
@import '../common/style/form.less';
@import '../common/style/todo.less';
</style>
