import React from 'react';
import Header from "./components/Header";
import Parameters from "./components/Parameters";
import Canvas from "./components/Canvas";
import { ContentProvider } from './context/ContentContext';
import "./App.css";
import axios from 'axios';
import History from './components/History';
import { useEffect } from 'react';
import Blur from './components/Blur';

function App() {

    return (
        <ContentProvider>
            <div className="app">
                <Header />
                <Blur />
                <Parameters />
                <Canvas />
                <History />
            </div>
        </ContentProvider>
    );
}

export default App;