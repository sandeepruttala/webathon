import React, { useContext, useState, useEffect } from "react";
import "../App.css";
import { ContentContext } from "../context/ContentContext";
import { IoSparklesSharp, IoReload, IoReloadCircle } from "react-icons/io5";
import { BiSolidMagicWand } from "react-icons/bi";

function Canvas() {
  const { contentData } = useContext(ContentContext);
  const setContext = useContext(ContentContext).setContentData;
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (contentData.new) {
      setDisplayedText("");
      contentData.content.split("").forEach((char, i) => {
        setTimeout(() => {
          setDisplayedText((prev) => prev + char);
        }, 10 * i);
      });
    }
  }, [contentData.content, contentData.new]);

  return (
    <div className="canvas">
      <div className="canvas__header">
        <h2 style={{ display: "flex", alignItems: "center" }}>
          Canvas&nbsp;<BiSolidMagicWand />
        </h2>
        <div className="canvas__header__buttons">
          <button className="canvas__header__button save">Save</button>
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
      </div>
    </div>
  );
}

export default Canvas;
