import React from 'react';
import LogContext from '../context/LogContext';
import { useState } from 'react';
import { useContext } from 'react';
const AddLog = () => {

    const context = useContext(LogContext);
    const { addLog } = context;
    const [log, setLog] = useState({ title: "", text: "" });

    const handleSubmit = (e) => {
        // e.preventDefault();
        addLog(log.title, log.text );
        setLog({ title: "", text: "" });
    }

    const onChange = (e) => {
        setLog({ ...log, [e.target.name]: e.target.value });
    }


    return (
        <div>
            <div className="container my-3">
                <h1>Make a journal entry</h1>
                <form className='my-3'  onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} value={log.title} minLength={3} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="text" className="form-label">Text</label>
                        <input type="text" className="form-control" id="text" name="text" onChange={onChange} value={log.text} minLength={5} required />
                    </div>
                    <button disabled={log.title.length < 3 || log.text.length < 5} type="submit" className="btn btn-primary">Add</button>
                </form>
            </div>
        </div>
    )
}

export default AddLog;