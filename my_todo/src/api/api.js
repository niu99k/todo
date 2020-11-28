import axios from 'axios'; //导入axios模块
export const menuList = params => { //封装一个函数，名为getTodoList
  return axios.get(`/todo/list`, { // 请求路径 ‘/todo/list’
    params: params
  });
};
export const addTodo = params => {
  return axios.post(`/todo/addTodo`, params)
};

export const detailsList = params => {
  return axios.get('todo/listId', {params: params})
}
export const addOneTodoDetails = params => {
  return axios.post('/todo/addRecord', params).then(res => res.data)
}
