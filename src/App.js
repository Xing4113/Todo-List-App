import './App.css';
import { GrAdd } from 'react-icons/gr';
import { useEffect, useState } from 'react';
import CollapseForm from './components/CollapseForm';
import { formatDate } from './components/utils/date.js';

function App() {

  const [title, setTitle] = useState("");
  const [todos, setToDo] = useState(() => {

    const localValue = localStorage.getItem("todos");

    if (localValue == null) return [];

    return JSON.parse(localValue);
  });


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos]);

  function addTitle(e) {
    setTitle(e.target.value);

    if (e.code === "Enter") {
      addToDo(title);
    }
  }

  function addToDo(title) {

    if (title.trim() !== "") {
      setToDo((currentTodos) => {
        return [
          ...currentTodos,
          {
            id: crypto.randomUUID(),
            title: title,
            dueDate: formatDate(new Date()),
            progress: "Pending",
            createdDate: formatDate(new Date()),
            desc: "Write Something...",
            priority: "Low"
          }
        ];
      });
    }

  }

  function updateTodo(updatedTodo) {
    setToDo((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === updatedTodo.id) {
          return {
            ...todo,
            dueDate: updatedTodo.dueDate,
            progress: updatedTodo.progress,
            desc: updatedTodo.desc,
            priority: updatedTodo.priority,
          }
        }

        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setToDo((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }


  return (
    <div className="App">
      <h1 className='title'>To Do List App</h1>

      <div className='body-container'>

        <div className='add-title-container'>
          <label className='add-title-label'>Title</label>
          <input type="text" placeholder="Add Task?" className="add-title-input" maxLength={40} onKeyUp={(e) => { addTitle(e) }} />
          <button className='add-title-btn' onClick={() => { addToDo(title) }}><GrAdd /></button>
        </div>

        {todos.length === 0 && <h1 style={{ fontWeight: "700", marginTop: "15px", paddingLeft: "20px" }}>No ToDo</h1>}
        {todos.map((todo) => {
          return (
            <div className="todo-list-container" key={todo.id}>

              <div className="todo-detail-container">
                <CollapseForm toDo={todo} deleteTodo={deleteTodo} updateTodo={updateTodo} />
              </div>

            </div>
          )
        })}
      </div>

    </div>
  );
}

export default App;
