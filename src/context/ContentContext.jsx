import { createContext, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const ContentContext = createContext();

// eslint-disable-next-line react/prop-types
export const ContentProvider = ({ children }) => {
    const [contentData, setContentData] = useState({ title: '', content: '', new: false, words: 0, seo_score: 0, readability_score: 0, tone: '', target_audience: '', topic: '' });

    return (
        <ContentContext.Provider value={{ contentData, setContentData }}>
            {children}
        </ContentContext.Provider>
    );
};
