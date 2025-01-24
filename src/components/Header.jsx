import React from "react";
import "../App.css";
import { RiAiGenerate2 } from "react-icons/ri";

function Header() {
  return (
    <div className="header">
      <div className="logo">
        <h2>
          <span style={{ fontFamily: "DM Serif Display", fontStyle: "italic" }}>
            SnapGen
            <RiAiGenerate2 />
          </span>
        </h2>
      </div>
    </div>
  );
}

export default Header;
