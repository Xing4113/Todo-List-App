

function CollapseForm() {
    return (
        <div>
            <div className="input-container">
                <label htmlFor="" className="text-label">Title</label>
                <input type="text" className="text-input" />
            </div>

            <div className="input-container">
                <label htmlFor="" className="text-label">Due Date</label>
                <input type="text" className="text-input" />
            </div>

            <div className="input-container">
                <label htmlFor="" className="text-label">Priority level</label>
                <input type="text" className="text-input" />
            </div>

            <div className="input-container">
                <label htmlFor="" className="text-label">Description</label>
                <input type="text" className="text-input" />
            </div>

            <div className="btn-container">
                <button className="add-btn">Add</button>
                <button className="cancel-btn">Cancel</button>
            </div>
        </div>
    );
}

export default CollapseForm;