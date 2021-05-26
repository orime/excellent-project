import { Button, Card, Checkbox, Input, InputNumber, List } from "antd"
import TextArea from "antd/lib/input/TextArea"
import { useCallback, useEffect, useState } from "react"

const ListItem = List.Item

const titleText = `今日待办：${new Date().toLocaleDateString()}`

const TodoList = () => {
  const [data, setData] = useState([])
  const [report, setReport] = useState('')

  useEffect(() => {
    setData([
      {id: 1, title: '测试用例审查修改', done: false, process: 50},
      {id: 2, title: 'ESLint规则修复', done: false, process: 50},
      {id: 3, title: 'SCRM优惠券问题排查', done: false, process: 50},
    ])
  }, [])

  const handleCheck = useCallback((id) => {
    const targetIndex = data.findIndex(todo => todo.id === id)
    const target = data[targetIndex]
    data.splice(targetIndex, 1, {...target, done: !target.done})
    setData([...data])
    handleGeneReport()
  }, [data])

  const handleGeneReport = useCallback(() => {
    let res = `${titleText}\n`
    data.forEach((todo, index) => {
      res += `\n${index+1}. ${todo.title} - 进度${todo.process}%`
    })
    res += `\n\n总结：充实的一天`
    setReport(res)
  }, [data])

  const handleProcess = useCallback((value, id) => {
    const targetIndex = data.findIndex(todo => todo.id === id)
    const target = data[targetIndex]
    data.splice(targetIndex, 1, {...target, process: value})
    setData([...data])
    handleGeneReport()
  }, [data, handleGeneReport])

  return (<Card title={titleText}>
    <List
      dataSource={data}
      renderItem={item => (
        <ListItem>
          <Checkbox onChange={() => handleCheck(item.id)}></Checkbox>&nbsp;&nbsp;
          {item.title}
          { item.done ? '100%' : '0%' }
          <div style={{float: 'right'}}>进度 <InputNumber value={item.process} min={0} max={100} formatter={value => `${value}%`} onChange={(value) => handleProcess(value, item.id)} /></div>
        </ListItem>
      )}
    />
    <Button onClick={handleGeneReport}>生成日报</Button>
    <TextArea value={report} rows={10}></TextArea>
  </Card>)
}

export default TodoList