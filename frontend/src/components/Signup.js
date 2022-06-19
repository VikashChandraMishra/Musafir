import React, { useContext, useEffect, useRef, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const ref = useRef(null);
    const context = useContext(AuthContext);
    let navigate = useNavigate();
    const { sign, setSign } = context;


    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;

        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ name, email, password })

        });

        const json = await response.json();
        const user = name;
        setCredentials({ name: "", email: "", password: "", cpassword: "" });

        if (json.success) {
            localStorage.setItem('token', json.authToken);
            localStorage.setItem('username', user);
            navigate(`/${user}/personal`);
        }
        else {
            alert("Invalid Credentials!");
        }
    }

    useEffect(() => {
        setCredentials({ name: "", email: "", password: "", cpassword: "" });
        if (sign) ref.current.click();
        setSign(false);
        console.log("Sign up form!", sign);
    }, [sign, setSign])

    return (
        <div className='container mt-4' style={{ paddingTop: "70px" }}>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#signup">
            </button>

            <div className="modal fade" id="signup" tabIndex="-1" role="dialog" aria-labelledby="signupLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="signupLabel">SignUp</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container my-3">
                                <form className='my-3' onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input type="text" className="form-control" id="name" name="name" minLength={5} aria-describedby="emailHelp" value={credentials.name} onChange={onChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="text" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="password" minLength={8} name="password" value={credentials.password} onChange={onChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Confirm Password</label>
                                        <input type="password" className="form-control" id="cpassword" name="cpassword" minLength={8} value={credentials.cpassword} onChange={onChange} required />
                                    </div>
                                    { credentials.cpassword !== credentials.password ? <div style={{color: 'red'}} >Password should match confirm password</div> : ""}
                                    <button type="submit" disabled={credentials.name.length < 5 || credentials.password.length < 8 || credentials.cpassword !== credentials.password} className="btn btn-secondary" data-bs-dismiss="modal">SignUp</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;