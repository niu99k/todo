import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Mock from 'mockjs';
import {
  Todos
} from './data/todoList'; // 导入Todos数据


let mock = new MockAdapter(axios); // 创建 MockAdapter 实例
export default {
  start() {
    this.selectAllMenuInfo();
    this.addOneMenuInfo();
    this.selectAllInfoDetails();
    this.addOneInfoDetails();
    this.editTodoTile();
  },
  addOneMenuInfo() {
    mock.onPost('/todo/addTodo').reply(config => {
      Todos.push({
        id: Mock.Random.guid(),
        title: 'newList',
        isDelete: false,
        locked: false,
        record: []
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200]);
        }, 200);
      });
    });
  },
  selectAllMenuInfo() {
    mock.onGet('/todo/list').reply(config => { //  config 指 前台传过来的值
      let mockTodo = Todos.map(todo => { // 重组 Todos数组，变成我们想要的数据
        return {
          id: todo.id,
          title: todo.title,
          count: todo.record.filter((data) => {
            if (data.checked === false) return true;
            return false;
          }).length, // 过滤到record里面 ‘checked’ 为true的数据，因为它们已经被完成了
          locked: todo.locked,
          isDelete: todo.isDelete
        };
      }).filter(todo => {
        if (todo.isDelete === true) return false; // 过滤掉 ‘isDelete’为true，因为已经被删除了。
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            todos: mockTodo // 返回状态为200，并且返回todos数据
          }]);
        }, 200);
      });
    });
  },
  selectAllInfoDetails() {
    mock.onGet('/todo/listId').reply(config => {
      let param = config.params;
      let id = param.id;
      let todoDetails = Todos.find(todo => {
        return id && todo.id === id
      });
      todoDetails.count = todoDetails.record.filter(todo => {
        return todo.checked === false
      }).length;

      if(todoDetails.isDelete){
        todoDetails={}
        todoDetails.count=0
        todoDetails.locked=true
      }
      return new Promise(((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {todo: todoDetails}]), 200
        })
      }))
    })
  },
  addOneInfoDetails() {
    mock.onPost('/todo/addRecord').reply(config => {
      let {id, text} = JSON.parse(config.data)
      Todos.some(todo => {
        if (todo.id === id) {
          todo.record.push({
            text: text,
            isDelete: false,
            checked: false
          })
          return true;
        }
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200]);
        }, 200)
      })
    })
  },
  editTodoTile() {
    // 修改标题
    mock.onPost('/todo/editTodo').reply(config => {
      let todo = JSON.parse(config.data);
      Todos.some((t, index) => {
        if (t.id === todo.id) {
          t.title = todo.title;
          t.locked = todo.locked;
          t.isDelete = todo.isDelete;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200]);
        }, 200);
      });
    });
  }
}
