import React, { useContext, useEffect, useRef, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const ref = useRef(null);
    const context = useContext(AuthContext);
    let navigate = useNavigate();
    // eslint-disable-next-line
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const { login, setLogin } = context;

    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = credentials;
        let response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ email, password })

        });

        let json = await response.json();
        setCredentials({ email: "", password: "" });

        if (json.success) {
            localStorage.setItem('token', json.authToken);
            response = await fetch('http://localhost:5000/api/auth/getuser', {
                method: 'GET',

                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }

            });
            json = await response.json();
            localStorage.setItem('username', json.user.name);
            navigate(`/${json.user.name}/personal`);
        }
        else {
            alert("Invalid Credentials!");
        }
    }

    useEffect(() => {
        setCredentials({ email: "", password: "" });
        if (login) ref.current.click();
        setLogin(false);
        console.log("Login form!", login);
    }, [login, setLogin])

    return (
        <div className='container mt-4' style={{ paddingTop: "70px" }}>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#login">
            </button>

            <div className="modal fade" id="login" tabIndex="-1" role="dialog" aria-labelledby="loginLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="loginLabel">Login</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container my-3">
                                <form className='my-3' onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="text" className="form-control" id="email1" name="email" minLength={8} value={credentials.email} onChange={onChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="password1" minLength={8} name="password" value={credentials.password} onChange={onChange} required />
                                    </div>
                                    <button type='submit' disabled={credentials.password.length < 8 || !credentials.email.match(pattern)} className="btn btn-primary">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;