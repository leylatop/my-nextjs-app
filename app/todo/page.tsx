'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useCallback } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export type Task = {
  id: number
  created_at: string
  task: string
  completed: boolean
}

export default function Todo() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Task[]>([]);
  const updateTodos = useCallback((todos: Task[]) => {
    setTodos(todos.sort((a: Task, b: Task) => a.id - b.id))
  }, [])

  const updateTodo = (id: number) => {
    fetch(`/api/todos/${id}`).then(res => res.json())
      .then(data => {
        const newTodo = data[0]
        const newTodos = todos.map(todo => todo.id === newTodo.id ? { ...todo, ...newTodo } : todo)
        updateTodos(newTodos)
      })
  }

  const initTodos = useCallback(() => {
    fetch('/api/todos')
      .then(res => res.json())
      .then(data => updateTodos(data))
  }, [updateTodos])

  useEffect(() => {
    initTodos()
  }, [initTodos])

  // 添加todo
  const handleSubmit = () => {
    if (!text) return
    fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ task: text })
    }).then(res => res.json())
      .then(data => {
        setText('')
        const newTodo = data[0]
        updateTodos([newTodo, ...todos])
      })
  }

  // 修改todo
  const handleCheckboxChange = (id: number, checked: boolean) => {
    const newTodos = todos.map(todo => todo.id === id ? { ...todo, completed: checked } : todo)
    updateTodos(newTodos)
    fetch(`/api/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ completed: checked })
    }).then(res => res.json())
      .then(() => {
        updateTodo(id)
      })
  }

  // 删除todo
  const handleDelete = (id: number) => {
    const newTodos = todos.filter(todo => todo.id !== id)
    updateTodos(newTodos)
    fetch(`/api/todos/${id}`, {
      method: 'DELETE'
    }).then(res => res.json())
      .then(() => {
        initTodos()
      })
  }
  return (
    <>
      <h1>Todo</h1>
      <Input value={text} onChange={(e) => setText(e.target.value)} />
      <Button onClick={handleSubmit}>Click me</Button>
      {/* <ToDoList todos={todos} /> */}
      {
        todos.map((todo) => (
          <div key={todo.id} className="flex items-center gap-2">
            <Checkbox id={todo.id.toString()} checked={todo.completed} onCheckedChange={(checked) => {
              handleCheckboxChange(todo.id, !!checked)
            }} />
            <div>{todo.task}</div>
            {/* <div>{todo.created_at}</div> */}
            <Button onClick={() => {
              handleDelete(todo.id)
            }}>Delete</Button>
          </div>
        ))
      }
    </>
  )
}