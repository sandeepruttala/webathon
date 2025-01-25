import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bg from '../bg.png';
import { RiAiGenerate2 } from 'react-icons/ri';
import './styles.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,12}$/;
        return regex.test(password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validatePassword(password)) {
            setError('Password must be 8-12 characters long, include uppercase, lowercase, and a number.');
            return;
        }
        axios.post('http://13.233.91.36:8000/register', { email, name, password })
            .then((res) => {
                console.log(res);
                alert('Registration successful');
                navigate('/login');
            })
            .catch((err) => {
                console.error(err);
                setError('Registration failed');
            });
        setError('');
    };

    return (
        <div>
            <img src={bg} alt="background" className="bg" />
            <h2>Register <span style={{ fontFamily: 'DM Serif Display', fontStyle: 'italic' }}><RiAiGenerate2 /></span></h2>
            <form onSubmit={handleSubmit} className='auth-form'>
                <input 
                    type="email" 
                    id="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                />
                <br />
                <input 
                    type="text" 
                    id="name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                />
                <br />
                <input 
                    type="password" 
                    id="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                />
                <br />
                <button type="submit">Register</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default Register;