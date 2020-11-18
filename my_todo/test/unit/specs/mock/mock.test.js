import mock from '@/mock/mock.js'

test('测试mock.js的接口拿到生成假数据', () => {
  return mock.selectAll().then((data) => {
    expect(data.todos).not.tobe(null || undefined);
  })
})

test('测试mock.js的接口没拿到生成假数据', () => {
  return mock.selectAll().catch((data) => {
    expect(data.todos).not.tobe(null || undefined);
  })
})

