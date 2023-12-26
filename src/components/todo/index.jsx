import React, { useEffect, useState } from "react";
import "./styles.css";
import { CreateTodoAPI, GetTodosAPI } from "../../services/be";

const TodoList = () => {
  const [tasks, setTask] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    GetTodosAPI().then((data) => {
      setTask(data)
    })
  }, [])

  const handleChangeInput = (e) => {
    setInput(e.target.value)
  }

  const handleCreateTask = () => {
    CreateTodoAPI({name: input}).then((data) => {
      if (data) {
        setTask((prev) => {
          const last = tasks.slice(-1)[0];
          const curr = [...prev, {id: last ? last.id + 1 : 0, name: data.name}]
          return curr
        })
      }
    })
  }

  const handleDeleteTask = (id) => {
    const idx = tasks.findIndex((task) => task.id === id)
    setTask((prev) => {
      const curr = [...prev.slice(0, idx), ...prev.slice(idx+1)]
      return curr
    })
  }

  return <div className="todo">
    <div className="header">
      <div className="tasks">
        <p className="title">TODO LIST</p>
        <div className="container">
          <input className="input" placeholder="Input task" onChange={handleChangeInput}/>
          <button className="btn" onClick={handleCreateTask}>Create</button>
        </div>
        <div className="list">
          {
            tasks.map((task) => <div className="task" key={task.id}>
              <p>{task.name}</p>
              <button className="btn_remove" onClick={() => {
                handleDeleteTask(task.id)
              }}>Remove</button>
            </div>)
          }
        </div>
      </div>
    </div>
  </div>;
};

export default TodoList;
