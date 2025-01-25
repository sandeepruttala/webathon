import React, { useContext, useState, useEffect } from "react";
import "../App.css";
import { ContentContext } from "../context/ContentContext";
import { BiSolidMagicWand } from "react-icons/bi";
import axios from "axios";

function Canvas() {
  const { contentData, setContentData } = useContext(ContentContext);
  const [displayedText, setDisplayedText] = useState("");
  const user_id = localStorage.getItem("user_id");
  const [prompt, setPrompt] = useState("");
  const [isPromptVisible, setIsPromptVisible] = useState(false); // Control popup visibility

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

  const handleSave = () => {
    axios
      .post("http://13.233.91.36:8000/save", {
        title: contentData.title,
        content: contentData.content,
        user_id: user_id,
      })
      .then((res) => {
        console.log(res);
        alert("Content saved successfully");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to save content");
      });
  };

  const handleRegeneration = () => {
    console.log(prompt);
    console.log(contentData);
    console.log(user_id);
    axios
      .post("http://13.233.91.36:8000/prompt", {
        title: contentData.title,
        content: contentData.content,
        user_id: user_id,
        prompt: prompt,
      })
      .then((res) => {
        console.log(res);
        setContentData({
          title: res.data.title,
          content: res.data.content,
          words: res.data.words,
          seo_score: res.data.seo_score,
          readability_score: res.data.readability_score,
          new: true,
        });
        setIsPromptVisible(false); // Hide the popup after successful regeneration
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to regenerate content");
      });
  };

  return (
    <div className="canvas">
      {isPromptVisible && (
        <div className="prompt-popup">
          <h2>Enter a prompt</h2>
          <textarea
            placeholder="Write your prompt here"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="prompt-popup__actions">
            <button onClick={handleRegeneration}>Regenerate</button>
            <button onClick={() => setIsPromptVisible(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="canvas__header">
        <h2 style={{ display: "flex", alignItems: "center" }}>
          Canvas&nbsp;
          <BiSolidMagicWand />
        </h2>
        <div className="canvas__header__buttons">
          <button onClick={() => setIsPromptVisible(true)}>Prompt</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>

      <div className="content">
        <input
          type="text"
          className="content__title"
          placeholder="Title"
          value={contentData.title}
          onChange={(e) =>
            setContentData({
              ...contentData,
              title: e.target.value,
            })
          }
        />
        <textarea
          className="content__body"
          placeholder="Content goes here"
          value={displayedText}
          onChange={(e) => {
            setDisplayedText(e.target.value);
            setContentData({
              ...contentData,
              content: e.target.value,
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
          <p>{contentData.words > 100 ? "1 min" : "2 min"}</p>
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
