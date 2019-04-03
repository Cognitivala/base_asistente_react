import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import registerServiceWorker from './registerServiceWorker';
import mainCss from "./assets/sass/main.module.scss";

import App from './app.js';

ReactDOM.render(
  <Provider store={ store }>
    <App mainCss={mainCss}/>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();