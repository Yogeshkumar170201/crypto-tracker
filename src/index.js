import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import CryptoContext from './CryptoContext';

ReactDOM.render(
  <CryptoContext>
      <App />
  </CryptoContext>,
  document.getElementById('root')
);

