import React from 'react';
import { Link } from 'react-router-dom';
import { RiAiGenerate2 } from 'react-icons/ri';
import './styles.css';
import bg from '../bg.png';

const HomePage = () => {
    return (
        <div className="homepage">
            <img src={bg} alt="background" className="bg" />
            <header className="logo">
                <h2>
                    <span style={{ fontFamily: 'DM Serif Display', fontStyle: 'italic' }}>
                        <RiAiGenerate2 />
                    </span>
                </h2>
            </header>
            <div className="catchy-lines">
                <p>Your AI-powered content generator</p>
                <p>Create stunning content effortlessly</p>
                <p>Join SnapGen today!</p>
            </div>
            <div className="buttons">
                <Link to="/register">
                    <button className="btn">Register / Sign Up</button>
                </Link>
                <Link to="/login">
                    <button className="btn">Log In</button>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;