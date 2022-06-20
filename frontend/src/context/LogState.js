import React from 'react';
import LogContext from './LogContext';
import { useState } from 'react';

const LogState = (props) => {

    const logsInitial = [];
    const host = "http://localhost:5000";


    const [ add , setAdd ] = useState(true);

    const [logs, setLogs] = useState(logsInitial);

    const getLogs = async () => {

        const response = await fetch(`${host}/api/logs/fetchalllogs`, {
            method: 'GET',

            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });

        const json = await response.json();

        console.log("Getting all logs");

        console.log(json);
        setLogs(json);

    }



    const addLog = async (title, text) => {

        const response = await fetch(`${host}/api/logs/addlog`, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },

            body: JSON.stringify({ title, text })
        });

        const log = await response.json();

        console.log("Adding a new log");

        setLogs(logs.concat(log));
    }



    const deleteLog = async (id) => {

        const response = await fetch(`${host}/api/logs/deletelog/${id}`, {
            method: 'DELETE',

            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });

        const json = await response.json();

        console.log(json);

        console.log("Log deleted -- id: " + id);
        const newLogs = logs.filter((Log) => { return Log._id !== id });
        setLogs(newLogs);
    }


    const updateLog = async (id, title, text) => {
        const response = await fetch(`${host}/api/logs/updatelog/${id}`, {
            method: 'PUT',

            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },

            body: JSON.stringify({ title, text })
        });

        const json = await response.json();

        console.log(json);

        let newLogs = JSON.parse(JSON.stringify(logs));


        for (let index = 0; index < newLogs.length; index++) {
            const element = logs[index];

            if (element._id === id) {
                newLogs[index].title = title;
                newLogs[index].description = text;
                break;
            }

        }

        console.log(json);

        setLogs(newLogs);

    }

    return (
        <div>
            <LogContext.Provider value={{ logs, addLog, getLogs, updateLog, deleteLog, add, setAdd }}>
                {props.children}
            </LogContext.Provider>
        </div>
    )
}

export default LogState;