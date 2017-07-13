import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import './index.css';
import App from './App/App';
import registerServiceWorker from './services/registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route path="/" component={App} />
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
