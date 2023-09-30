import Collapse from 'react-bootstrap/Collapse';
import { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import Form from "react-bootstrap/Form";
import { formatDate } from './utils/date.js';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function CollapseForm(props) {

    const toDo = props.toDo;
    const [open, setOpen] = useState(false);
    const [desc, setDesc] = useState(toDo.desc);
    const [dueDate, setDueDate] = useState(new Date());
    const [progress, setProgress] = useState(toDo.progress);
    const [priority, setPriority] = useState(toDo.priority);

    const [updatedTodo, setUpdatedToDo] = useState({});


    function saveBtn(id) {
        setUpdatedToDo(() => {
            return {
                id: toDo.id,
                dueDate: formatDate(dueDate),
                progress: progress,
                desc: desc,
                priority: priority
            };
        });

    }

    useEffect(() => {
        props.updateTodo(updatedTodo);
    }, [updatedTodo]);


    return (
        <div>
            <input type="checkbox" checked={toDo.isCompleted} onChange={(e) => { props.toggleTodo(toDo.id, e.target.checked) }} />

            <p
                onClick={() => setOpen(!open)}
                aria-controls="collapse-container"
                aria-expanded={open}
            >
                {toDo.title}
            </p>
            <a className="delete-btn" onClick={() => { props.deleteTodo(toDo.id) }}><AiOutlineDelete /></a>

            <Collapse in={open}>
                <div id="collapse-container">

                    <div className="label-container">
                        <label className="text-label">Due Date: <span className="respond-label"> {toDo.dueDate}</span> </label>
                        <DatePicker value={formatDate(dueDate)} selected={dueDate} onChange={(date) => setDueDate(date)} minDate={new Date()} />
                    </div>

                    <div className="label-container">
                        <label className="text-label">Progress:<span className="respond-label"> {toDo.progress}</span> </label>
                        <Form.Select aria-label="Default select example" value={progress} onChange={(e) => { setProgress(e.target.value) }}>
                            <option value="Pending">Pending</option>
                            <option value="In progress">In progress</option>
                            <option value="Completed">Completed</option>
                        </Form.Select>
                    </div>

                    <div className="label-container">
                        <label className="text-label">Priority level: <span className="respond-label"> {toDo.priority}</span> </label>
                        <Form.Select aria-label="Default select example" value={priority} onChange={(e) => { setPriority(e.target.value) }}>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </Form.Select>
                    </div>

                    <div className="label-container">
                        <label className="text-label">Description: <span className="respond-label"> {toDo.desc}</span> </label>
                        <input type="text" value={desc} onChange={(e) => { setDesc(e.target.value) }} />
                    </div>

                    <div className="btn-container">
                        <button className="edit-btn">Edit</button>
                        <button className="save-btn" onClick={() => { saveBtn(toDo.id) }}>Save</button>
                        <button className="cancel-btn" >Cancel</button>
                    </div>
                </div>
            </Collapse>

        </div>
    );
}

export default CollapseForm;