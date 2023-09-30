import './App.css';
import { GrAdd } from 'react-icons/gr';
import { AiOutlineDelete } from 'react-icons/ai';
import { useState } from 'react';



function App() {

  const [title, setTitle] = useState("");
  const [todos, setToDo] = useState([]);

  function addTitle(e) {
    setTitle(e.target.value);

    if (e.code === "Enter") {
      addToDo(title);
    }
  }

  function addToDo(title) {
    setToDo((currentTodos) => {
      return [...currentTodos, { id: crypto.randomUUID(), title: title, isCompleted: false }];
    });
  }

  const toggleTodo = (id, isCompleted) => {
    setToDo((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isCompleted: isCompleted }
        }

        return todo;
      });
    });

  };

  function deleteTodo(id) {
    setToDo((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  return (
    <div className="App">
      <h1 className='title'>To Do List App</h1>
      <div>
        <input type="text" className="add-title-input" onKeyUp={(e) => { addTitle(e) }} />
        <button className='add-title-btn' onClick={() => { addToDo(title) }}><GrAdd /> Add Title</button>
        {todos.map((todo, index) => {
          return (
            <div className="todo-list-container" key={todo.id}>
              <input type="checkbox" checked={todo.isCompleted} onChange={(e) => { toggleTodo(todo.id, e.target.checked) }} />

              <label>
                <div className="label">
                  {todo.title}
                  <a className="delete-btn" onClick={() => { deleteTodo(todo.id) }}><AiOutlineDelete /></a>
                </div>
              </label>

            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
