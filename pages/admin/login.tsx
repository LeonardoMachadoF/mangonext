import React, { useState } from 'react';
import nookies from 'nookies';

const Login = () => {
    const [inputValue, setInputValue] = useState('')

    const handleClick = () => {
        nookies.set(null, "authorization", inputValue, {
            maxAge: 60 * 60 * 24 * 30,
            path: '/'
        })
    }


    return (
        <div>
            <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} />
            <button onClick={handleClick}>Enviar</button>
        </div>
    )
}

export default Login;