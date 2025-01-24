import { createContext, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const EmailContext = createContext();

// eslint-disable-next-line react/prop-types
export const EmailProvider = ({ children }) => {
    const [EmailData, setEmailData] = useState({ email: ''});

    return (
        <EmailContext.Provider value={{ EmailData, setEmailData }}>
            {children}
        </EmailContext.Provider>
    );
};
