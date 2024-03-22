import ReactDOM from 'react-dom/client';
import App from './components/App.tsx';
import './index.css';
import { Buffer } from 'buffer';
import React from 'react';
globalThis.Buffer = Buffer;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
