import React, { useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {

    let location = useLocation();
    let navigate = useNavigate();

    const context = useContext(AuthContext);
    const { setSign, setLog } = context;

    const handleSignUp = (e) => {
        e.preventDefault();
        setSign(true);
    }

    const handleLogIn = (e) => {
        e.preventDefault();
        setLog(true);
    }

    const handleLogOut = () => {
        localStorage.removeItem('token');
        navigate('/');
    }

    useEffect(() => {
        // console.log(location);
    }, [location])

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">MusaFir.com</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                        <ul className="navbar-nav me-auto mb-2 mx-4 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
                            </li>
                            {
                                localStorage.getItem('token') ?
                                    <div className=' d-flex justify-content-around' style={{width: "800px", paddingLeft: "250px", paddingRight: "250px"}}>
                                        <li className="nav-item">
                                            <Link className={`nav-link ${location.pathname === '/user' ? 'active' : ''}`} to="/user">Personal</Link>
                                        </li><li className="nav-item">
                                            <Link className={`nav-link ${location.pathname === '/journal' ? 'active' : ''}`} to="/journal">Journal</Link>
                                        </li><li className="nav-item">
                                            <Link className={`nav-link ${location.pathname === '/images' ? 'active' : ''}`} to="/location">Location</Link>
                                        </li>
                                    </div> : ""
                            }
                        </ul>
                        {
                            !localStorage.getItem('token') ? <div className="d-flex">
                                <button className='btn btn-primary mx-2' onClick={handleLogIn} >Login</button>
                                <button className='btn btn-primary mx-2' onClick={handleSignUp} >SignUp</button>
                            </div> :
                                <button className='btn btn-primary' onClick={handleLogOut}>Log Out</button>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;