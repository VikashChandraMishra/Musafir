import React from 'react';
import AuthContext from './AuthContext';
import { useState } from 'react';

const AuthState = (props) => {

    const [sign, setSign] = useState(false);
    const [login, setLogin] = useState(false);

    return (
        <div>
            <AuthContext.Provider value={{ sign, setSign, login, setLogin }}>
                {props.children}
            </AuthContext.Provider>
        </div>
    )
}

export default AuthState;