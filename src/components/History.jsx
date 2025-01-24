import React from 'react'
import axios from 'axios'
import { ContentContext } from "../context/ContentContext";
import { useState, useEffect, useContext } from 'react'
function History() {

    const [history, setHistory] = useState([]);
     const { setContentData } = useContext(ContentContext);
     const user_id = localStorage.getItem('user_id');

    useEffect(() => {
        axios.get(`http://13.203.76.50:8000/topics/${user_id}`)
            .then((res) => {
                console.log(res);
                const topics = res.data.map(item => ({
                    title: item.topic.title,
                    content: item.topic.content,
                    words: item.topic.words,
                    seo_score: item.topic.seo_score,
                    readability_score: item.topic.readability_score,
                    tone: item.topic.tone,
                    target_audience: item.topic.target_audience,
                    topic: item.topic
                }));
                setHistory(topics);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

  return (
    <div className='history'>
      <h2>History</h2>
        <div className='history__content'>
            {history.map((item, index) => {
            return (
                <div key={index} className='history__item' onClick={() => { setContentData({ title: item.title, content: item.content, new: false, words: item.words, seo_score: item.seo_score, readability_score: item.readability_score, tone: item.tone, target_audience: item.target_audience, topic: item.topic }) }}>
                <h3>{item.title}</h3>
                </div>
            );
            })}
        </div>
    </div>
  )
}

export default History
