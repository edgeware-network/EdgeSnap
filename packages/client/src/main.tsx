import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { MetaMaskContextProvider } from '../context/metamask.tsx';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Router>
      <MetaMaskContextProvider>
        <App />
      </MetaMaskContextProvider>
    </Router>
  </React.StrictMode>,
);
