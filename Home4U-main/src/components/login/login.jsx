import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('handleSubmit called');

        fetch('http://localhost:3000/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                if (data.uid && data.username && data.email) {
                    console.log('Login successful');
                    console.log(data);
                    navigate('/', { state: { uid: data.uid } }); // Redirect to main page
                } else {
                    // Handle login failure here
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="email"
                    placeholder="Username"
                    value={email}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleInputChange}
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );

}

export default Login;
