import React, { useContext } from 'react';
import LogContext from '../context/LogContext';

const Log = (props) => {
  const { log } = props;

  const { deleteLog } = useContext(LogContext);

  return (
    <div>
      <div className="card my-4">
        <h5 className="card-header d-flex justify-content-between">{(new Date(log.date)).toGMTString()}
          <span>
            <i className="fa-solid fa-trash-can mx-3" style={{ cursor: "pointer" }} onClick={ () => {deleteLog(log._id)} }></i>
            <i className="fa-solid fa-pen-to-square" style={{ cursor: "pointer" }}></i>
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