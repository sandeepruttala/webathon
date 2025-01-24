import React from 'react';
import Header from "./components/Header";
import Parameters from "./components/Parameters";
import Canvas from "./components/Canvas";
import { ContentProvider } from './context/ContentContext';
import "./App.css";
import axios from 'axios';
import { useEffect } from 'react';

function App() {

    return (
        <ContentProvider>
            <div className="app">
                <Header />
                <Parameters />
                <Canvas />
            </div>
        </ContentProvider>
    );
}

export default App;