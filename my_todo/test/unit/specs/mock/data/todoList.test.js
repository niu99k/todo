import {Todos} from '@/mock/data/todoList.js'

test('假数据是否成功生成', () => {
  let data = Todos
  expect(data.length).toBe(5);
  for (let i in Todos) {
    let todo=Todos[i]
    expect(todo.id).not.toBe(null||undefined)
    expect(todo.title).not.toBe(null||undefined)
    expect(todo.isDelete).toBe(false)
    for(let j in todo.record){
      let record=todo.record[j]
      expect(record.text).not.toBe(null||undefined)
      expect(record.isDelete).toBe(false)
      expect(record.checked).not.toBe(null||undefined)
      expect(record.sss).toBe(null||undefined)
    }
  }
})
