import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//server
import { setUpServer } from './services/mirage/Server';

if(process.env.NODE_ENV === 'development'){
  setUpServer()
}

ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);
