import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
import App from './App';
import store from './js/redux/store/index';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
// eslint-disable-next-line
import index from './js/redux/index'

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

serviceWorker.unregister();
