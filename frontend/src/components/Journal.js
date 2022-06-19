import React, { useContext, useEffect } from 'react';
import LogContext from '../context/LogContext';
import Log from './Log';
import { useNavigate } from 'react-router-dom';

const Journal = () => {
  const navigate = useNavigate();
  const context = useContext(LogContext);
  const { logs, getLogs } = context;

  useEffect(() => {
    if (localStorage.getItem('token'))
      getLogs();
    else {
      navigate('/');
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className='container my-3'>
      <div className="row md-3">
        <h1>My Journal</h1>
        <div className="container mx-2">
          {logs.length === 0 ? 'You have no entries' : ''}
        </div>
        <div className="container">
          {logs.map((log) => {
            return <Log log={log} key={log._id} />;
          })}
        </div>
      </div>
    </div>
  )
}

export default Journal;