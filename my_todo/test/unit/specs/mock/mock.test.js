import mock from '@/mock/mock.js'
import axios from "axios";
import {Todos} from '@/mock/data/todoList.js'
import {detailsList, addOneTodoDetails} from '@/api/api'

test('测试mock.js的接口拿到生成假数据', () => {
  mock.start();
  return axios.get(`/todo/list`, {})
    .then((data) => {
      expect(data.data.todos).not.toBe(null || undefined);
    })
})

test('测试是否能查到Todos的数据', () => {
  mock.start();
  let todoId = Todos[0].id
  return detailsList({id: todoId})
    .then((data) => {
      expect(data.data.todo).not.toBe(null)
    })
})

test('测试是否真的增加了Todos', () => {
  let originalLength = Todos[0].record.length
  let todoId = Todos[0].id
  let text = 'ppoqq'
  return addOneTodoDetails({id: todoId,text:text})
    .then(() => {
      expect(originalLength).not.toBe(Todos[0].record.length)
    })
})
