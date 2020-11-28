<template>
  <div class="page lists-show"><!--最外层容器-->
    <nav><!--容器上半部分-->
        <div class="nav-group" @click="$store.dispatch('updateMenu')" v-show="!isUpdate">
        <!-- 在菜单的图标下面添加updateMenu时间，他可以直接调用vuex actions.js里面的updateMenu方法 --> <!--移动端的菜单图标-->
        <a class="nav-item">
          <span class="icon-list-unordered">
          </span>
        </a>
      </div>
      <h1 class="title-page">
        <span class="title-wrapper">{{ todo.title }}</span> <!-- 标题-->
        <span class="count-list">{{ todo.count }}</span><!-- 数目-->
      </h1>
      <div class="nav-group right"><!-- 右边的删除，锁定图标容器-->
        <div class="options-web">
          <a class=" nav-item"> <!-- 锁定图标-->
            <span class="icon-lock" v-if="todo.locked"></span>
            <span class="icon-unlock" v-else>
            </span>
          </a>
          <a class=" nav-item"><!-- 删除图标-->
            <span class="icon-trash">
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
import {detailsList, addOneTodoDetails} from "../api/api";
import{Todos} from '@/mock/data/todoList'

let todoId=''
export default {
  watch:{
    "$route.params.id"(){
      todoId=this.$route.params.id
      this.initWithTodoId(todoId)
    }
  },
  created() {
    this.initWithTodoId(Todos[0].id)
    console.log(this.items)
  },
  components: {
    item
  },
  data() {
    return {
      todo: {
        title: '星期一', // 标题
        count: 12, // 数量
        locked: false // 是否绑定
      },
      items: [  // 代办单项列表
      ],
      text: '', // 用户输入单项项绑定的输入
      isUpdate: false // 新增修改状态
    };
  },
  methods: {
    onAdd() {
      addOneTodoDetails({id:todoId,text:(this.text)}).then(res=>{
        this.text=''
        this.initWithTodoId(todoId)
      })
    },
    initWithTodoId(todoId){
      const todoDetailsId=todoId;
      detailsList({id:todoDetailsId}).then(res=>{
        let{id,title,count,isDeleted,locked,record}=res.data.todo;
        this.items=record
        this.todo={
          id:id,
          title:title,
          count:count,
          locked:locked,
          isDeleted:isDeleted
        }
      })
    }
  }
}
</script>
<style lang="less">
@import '../common/style/nav.less';
@import '../common/style/form.less';
@import '../common/style/todo.less';
</style>
