import { Card, Checkbox, Input, InputNumber, List } from "antd"
import { useCallback, useEffect, useState } from "react"

const ListItem = List.Item

const titleText = `今日待办：${new Date().toLocaleDateString()}`

const TodoList = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    setData([
      {id: 1, title: '测试用例审查修改', done: false},
      {id: 2, title: 'ESLint规则修复', done: false},
      {id: 3, title: 'SCRM优惠券问题排查', done: false},
    ])
  }, [])

  const handleCheck = useCallback((id) => {
    const targetIndex = data.findIndex(todo => todo.id === id)
    const target = data[targetIndex]
    data.splice(targetIndex, 1, {...target, done: !target.done})
    setData([...data])
  }, [data])

  return (<Card title={titleText}>
    <List
      dataSource={data}
      renderItem={item => (
        <ListItem>
          <Checkbox onChange={() => handleCheck(item.id)}></Checkbox>&nbsp;&nbsp;
          {item.title}
          { item.done ? '100%' : '0%' }
          <div style={{float: 'right'}}>完成度 <InputNumber min={0} max={100} formatter={value => `${value}%`} /></div>
        </ListItem>
      )}
    />
  </Card>)
}

export default TodoList