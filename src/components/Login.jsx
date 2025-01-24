import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import { RiAiGenerate2 } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { EmailContext } from '../context/EmailContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        axios.post('http://192.168.137.83:8000/auth/login', { email, password })
            .then((res) => {
                console.log(res);
                alert('Logged in successfully');
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
                alert('Login failed');
            });
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Login to <span style={{fontFamily: "DM Serif Display", fontStyle:'italic'}}>SnapGen<RiAiGenerate2 /></span></h2>
            <form onSubmit={handleSubmit} className='auth-form'>
                <input 
                    type="email" 
                    id="email" 
                    value={email}
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br />
                <input 
                    type="password" 
                    id="password" 
                    value={password}
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />
                <button type="submit">Sign In</button>
            </form>
            {/* copyrights */}
            <br />
            <p style={{color: '#505050'}}>&copy; 2025 SnapGen AI. All rights reserved.</p>
        </div>
    );

};

export default Login;