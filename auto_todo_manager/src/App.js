import './App.less'
import { Button } from 'antd'
import TodoList from './TodoList'

function App() {
  return (
    <div className="App">
      <Button type="primary">按钮</Button>
      <TodoList />
    </div>
  );
}

export default App;
