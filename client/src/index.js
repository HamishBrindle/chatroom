import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './App';

// Redux Stuff
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import handleNewMessage from './sagas';

// Amplify - our user Auth system
import Amplify from 'aws-amplify';
import awsmobile from './aws-exports';

Amplify.configure(awsmobile); // Setup the damn Auth system, woooo so easy

// We using saga for this one
const sagaMiddleware = createSagaMiddleware();

// Our redux store object
const store = createStore(
  reducers,
  compose(
    applyMiddleware(sagaMiddleware), 
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

// Our middleware - Ok so I pass store into our middleware
// because I needed the socket object we put in there for
// sending new messages (see ./sagas/index.js)
sagaMiddleware.run(
  handleNewMessage,
  { store }
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();