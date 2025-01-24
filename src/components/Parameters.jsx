import React, { useState, useContext } from "react";
import axios from "axios";
import "../App.css";
import { IoSparklesSharp, IoReload } from "react-icons/io5";
import { ContentContext } from "../context/ContentContext";
import { GiSettingsKnobs } from "react-icons/gi";

function Parameters() {
  const { setContentData } = useContext(ContentContext);
  const user_id = localStorage.getItem('user_id');
  const [formData, setFormData] = useState({
    tone: "none",
    topic: "",
    length: "",
    target_audience: "",
    user_id: user_id,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.tone === "none") {
      alert("Please select a tone");
      return;
    }

    setIsLoading(true);
    console.log(formData);
    axios
      .post("http://13.203.76.50:8000/generate", formData)
      .then((res) => {
        console.log(res.data);
        setContentData({
          title: res.data.title,
          content: res.data.content,
          length: res.data.length,
          new: true,
          words: res.data.words,
          seo_score: res.data.seo_score,
          readability_score: res.data.readability_score,
          tone: formData.tone,
          target_audience: formData.target_audience,
          topic: formData.topic,
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  return (
    <div className="parameters">
      <h2
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Parameters &nbsp;
        <GiSettingsKnobs />
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Topic Name"
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          required
        />
        <select name="tone" value={formData.tone} onChange={handleChange}>
          <option value="none" disabled>
            -- Select Tone --
          </option>
          {[
            "formal",
            "informal",
            "optimistic",
            "worried",
            "friendly",
            "curious",
            "assertive",
            "encouraging",
            "surprised",
            "cooperative",
          ].map((tone) => (
            <option key={tone} value={tone}>
              {tone}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Minimum Length (in words)"
          name="length"
          value={formData.length}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Target Audience"
          name="target_audience"
          value={formData.target_audience}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <>Generating...</>
          ) : (
            <>
              Generate Content &nbsp;
              <IoSparklesSharp />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default Parameters;
