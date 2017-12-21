import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Reactを描画
ReactDOM.render(
  <App />,
  document.getElementById('main')
);
