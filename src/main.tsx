import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Admin from './pages/Admin';
import './index.css';

const isAdmin = window.location.pathname.startsWith('/admin');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {isAdmin ? <Admin /> : <App />}
  </React.StrictMode>
);
