import './App.css';
import { GrAdd } from 'react-icons/gr';
import { useState } from 'react';
import CollapseForm from './components/CollapseForm';
import { formatDate } from './components/utils/date.js';
import { Filter } from './components/Filter';


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
          <input type="text" className="add-title-input" onKeyUp={(e) => { addTitle(e) }} />
          <button className='add-title-btn' onClick={() => { addToDo(title) }}><GrAdd /></button>
        </div>

        <Filter />

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
