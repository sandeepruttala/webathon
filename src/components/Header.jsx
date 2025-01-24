import React from "react";
import "../App.css";
import { RiAiGenerate2 } from "react-icons/ri";

function Header() {

  const handleHistory = () => {

    const history = document.querySelector('.history');
    const blur = document.querySelector('.blur');
    if (history.style.left === '0px') {
      history.style.left = '-100%';
      return;
    }
    history.style.left = '0';
    blur.style.display = 'block';
  }

  return (
    <div className="header">
      <div className="logo">
        <h2>
          <span style={{ fontFamily: "DM Serif Display", fontStyle: "italic" }}>
            <RiAiGenerate2 />
          </span>
        </h2>
      </div>
      <div>
      <button className="header__button" onClick={handleHistory}>History</button>
      &nbsp; &nbsp;
      <button className="header__button" onClick={
        () => {
          localStorage.removeItem('user_id');
          window.location.href = '/login';
        }
      }>Logout</button>
      </div>
    </div>
  );
}

export default Header;
