import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi';
import Dropdown from 'react-bootstrap/Dropdown';
import "./Filter.css"

export const Filter = () => {
    return (
        <div className="filter-containter">
            <Dropdown className='filter-items-containter'>
                <Dropdown.Toggle className='filter-btn'>
                    <span className='sort-link'>Sort</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Title</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Progress</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Due Date</Dropdown.Item>
                    <Dropdown.Item href="#/action-4">Priority Level</Dropdown.Item>
                    <Dropdown.Item href="#/action-5">Created Date</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>



        </div>
    )
}
