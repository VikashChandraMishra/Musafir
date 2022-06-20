import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LogContext from '../context/LogContext';

const Log = (props) => {
  const { log } = props;
  const navigate = useNavigate();
  const { deleteLog, setAdd } = useContext(LogContext);

  const editLog = () => {
    localStorage.setItem('logId', log._id);
    localStorage.setItem('title', log.title);
    localStorage.setItem('text', log.text);
    setAdd(false);
    navigate(`/${localStorage.getItem('username')}/personal`);
  }

  return (
    <div>
      <div className="card my-4">
        <h5 className="card-header d-flex justify-content-between">{(new Date(log.date)).toGMTString()}
          <span>
            <i className="fa-solid fa-trash-can mx-3" style={{ cursor: "pointer" }} onClick={() => { deleteLog(log._id) }}></i>
            <i className="fa-solid fa-pen-to-square" style={{ cursor: "pointer" }} onClick={editLog} ></i>
          </span>
        </h5>
        <div className="card-body">
          <h5 className="card-title">{log.title}</h5>
          <p className="card-text">{log.text}</p>
        </div>
      </div>
    </div>
  )
}

export default Log;