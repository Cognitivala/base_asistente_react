import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import registerServiceWorker from './registerServiceWorker';

import App from './app.js';

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  // document.getElementById('root-assistant-test')
  document.getElementById('root')
);

registerServiceWorker();