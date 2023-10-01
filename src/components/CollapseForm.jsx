import Collapse from 'react-bootstrap/Collapse';
import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { MdOutlinePending } from 'react-icons/md';
import { TbProgressCheck } from 'react-icons/tb';
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5';
import Form from "react-bootstrap/Form";
import { formatDate } from './utils/date.js';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CollapseForm.css";

function CollapseForm(props) {

    const toDo = props.toDo;
    const [open, setOpen] = useState(false);
    const [hideInput, setHideInput] = useState(true);

    const [desc, setDesc] = useState(toDo.desc);
    const [dueDate, setDueDate] = useState(new Date());
    const [progress, setProgress] = useState(toDo.progress);
    const [priority, setPriority] = useState(toDo.priority);

    const [updatedTodo, setUpdatedToDo] = useState({});

    const hideInputStyle = {
        display: hideInput ? 'none' : 'initial',
    };

    const showInputStyle = {
        display: hideInput ? 'initial' : 'none',
    };

    function saveBtn() {
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

    function inputAppearHandle() {
        setHideInput(currentHideInput => !currentHideInput);
    }

    useEffect(() => {
        props.updateTodo(updatedTodo);
        setHideInput(currentHideInput => !currentHideInput);
    }, [updatedTodo]);


    return (
        <div className='todo-list-container'>
            <div className="todo-list-header-container">
                <div className="header-icon">
                    <MdOutlinePending className='pending-icon' style={{ display: toDo.progress === "Pending" ? "initial" : "none" }} />
                    <TbProgressCheck className='in-progress-icon' style={{ display: toDo.progress === "In Progress" ? "initial" : "none" }} />
                    <IoCheckmarkDoneCircleOutline className='completed-icon' style={{ display: toDo.progress === "Completed" ? "initial" : "none" }} />

                </div>

                <div className="toDo-title-container">
                    <p
                        onClick={() => setOpen(!open)}
                        aria-expanded={open}
                        className='toDo-title-container'
                    >
                        {toDo.title}
                    </p>
                </div>

                <a className="delete-btn-container" onClick={() => { props.deleteTodo(toDo.id) }}><IoMdClose className='delete-btn' /></a>
            </div>

            <Collapse in={open}>
                <div id="collapse-container">
                    <div className="top-container">
                        <div className="label-container">
                            <label className="text-label">Due Date:</label>
                            <span className="respond-label" style={showInputStyle}> {toDo.dueDate}</span>
                            <div style={hideInputStyle}>
                                <DatePicker className='input-container datepicker' value={formatDate(dueDate)} selected={dueDate} onChange={(date) => setDueDate(date)} minDate={new Date()} />
                            </div>
                        </div>

                        <div className="label-container">
                            <label className="text-label">Progress:</label>
                            <span className="respond-label" style={showInputStyle}> {toDo.progress}</span>
                            <Form.Select className='input-container' style={hideInputStyle} aria-label="Default select example" value={progress} onChange={(e) => { setProgress(e.target.value) }}>
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </Form.Select>
                        </div>

                        <div className="label-container">
                            <label className="text-label" >Priority Level:</label>
                            <span className="respond-label priority-level-label" style={showInputStyle} > {toDo.priority}</span>
                            <Form.Select className='input-container' style={hideInputStyle} aria-label="Default select example" value={priority} onChange={(e) => { setPriority(e.target.value) }}>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </Form.Select>
                        </div>
                    </div>

                    <div className="desc-container">
                        <label className="desc-text-label">Description: </label>
                        <div className="desc-respond-label" style={showInputStyle} onClick={inputAppearHandle}>{desc} </div>
                        <input className='desc-input-container' style={hideInputStyle} defaultValue={toDo.desc} onChange={e => setDesc(e.target.value)} />
                    </div>

                    <div className="create-date-container">
                        <label style={{ textAlign: "left" }}><b>Creation Date:</b> {toDo.createdDate}</label>
                    </div>
                    <div className="link-container">
                        <a className="edit-link" style={showInputStyle} onClick={inputAppearHandle}>Edit</a>
                        <a className="save-link" style={hideInputStyle} onClick={() => { saveBtn() }} >Save</a>
                        <a className="cancel-link" style={hideInputStyle} onClick={inputAppearHandle}>Cancel</a>
                    </div>
                </div>
            </Collapse>

        </div>
    );
}

export default CollapseForm;