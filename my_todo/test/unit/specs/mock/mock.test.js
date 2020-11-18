import mock from '@/mock/mock.js'
import axios from "axios";

test('测试mock.js的接口拿到生成假数据', () => {
  mock.start();
  return axios.get(`/todo/list`, {})
    .then((data) => {
    expect(data.data.todos).not.toBe(null || undefined);
  })
})

