import './App.css';
import CollapseForm from './components/Example';
import { useState } from 'react';
import { Button, Collapse } from 'react-bootstrap';

function App() {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [dueDate, setdueDate] = useState("");
  const [priorityLevel, setPriorityLevel] = useState("");
  const [desc, setDesc] = useState("");



  return (
    <div className="App">
      <h1 className='title'>To Do List App</h1>
      <div>
        <input type="text" className="add-title-input" />
        <button className='add-title-btn'>Add Title</button>

        
      </div>
    </div>
  );
}

export default App;
