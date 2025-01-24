import React, { useContext, useState, useEffect } from "react";
import "../App.css";
import { ContentContext } from "../context/ContentContext";
import { IoSparklesSharp, IoReload, IoReloadCircle } from "react-icons/io5";
import { BiSolidMagicWand } from "react-icons/bi";
import axios from "axios";

function Canvas() {
  const { contentData } = useContext(ContentContext);
  const setContentData = useContext(ContentContext).setContentData;
  const setContext = useContext(ContentContext).setContentData;
  const [displayedText, setDisplayedText] = useState("");
  const user_id = localStorage.getItem("user_id");

  const [formData, setFormData] = useState({
    tone: "",
    topic: "",
    length: "",
    target_audience: "",
    user_id: user_id,
  });

  useEffect(() => {
    if (contentData.new) {
      const canvasElement = document.querySelector(".canvas");
      const parametersElement = document.querySelector(".parameters");
      const canvasFooter = document.querySelector(".canvas__footer");

      // Add animation classes
      canvasElement.classList.add("canvas-animated");
      parametersElement.classList.add("parameters-animated");
      canvasFooter.classList.remove("canvas__footer-animated");

      setDisplayedText("");

      // Calculate the total duration for the text animation
      const totalDuration = contentData.content.length * 10; // 10ms per character

      // Update the displayed text one character at a time
      contentData.content.split("").forEach((char, i) => {
        setTimeout(() => {
          setDisplayedText((prev) => prev + char);
        }, 10 * i);
      });

      // Remove animation classes after the loop finishes
      setTimeout(() => {
        canvasElement.classList.remove("canvas-animated");
        parametersElement.classList.remove("parameters-animated");
        canvasFooter.classList.add("canvas__footer-animated");
      }, totalDuration + 500); // Add a delay for the easing-out effect
    } else {
      setDisplayedText(contentData.content);
    }
  }, [contentData.content, contentData.new]);

  return (
    <div className="canvas">
      <div className="canvas__header">
        <h2 style={{ display: "flex", alignItems: "center" }}>
          Canvas&nbsp;
          <BiSolidMagicWand />
        </h2>
        <div className="canvas__header__buttons">
          <button className="canvas__header__button">Export</button>
        </div>
      </div>
      <div className="content">
        <input
          type="text"
          className="content__title"
          placeholder="Title"
          value={contentData.title}
          onChange={(e) => {
            setContext({ title: e.target.value, new: false });
          }}
        />
        <textarea
          className="content__body"
          placeholder="Content goes here"
          value={displayedText}
          onChange={(e) => {
            setDisplayedText(e.target.value);
            setContext({
              title: contentData.title,
              content: displayedText,
              new: false,
            });
          }}
        />
      </div>
      <div className="canvas__footer">
        <div className="canvas__footer__card">
          <h3>Words</h3>
          <p>{contentData.words}</p>
        </div>
        <div className="canvas__footer__card">
          <h3>Read Time</h3>
          <p>{Math.ceil(displayedText.split(" ").length / 200)} min</p>
        </div>
        <div className="canvas__footer__card">
          <h3>SEO Score</h3>
          <p>{contentData.seo_score}</p>
        </div>
        <div className="canvas__footer__card">
          <h3>Readability</h3>
          <p>{contentData.readability_score}</p>
        </div>
      </div>
    </div>
  );
}

export default Canvas;
