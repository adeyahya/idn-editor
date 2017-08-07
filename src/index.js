import path from 'path';
import '../sass/app.scss';
import 'font-awesome/scss/font-awesome.scss';
import React from 'react';
import { render } from 'react-dom';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import Wrapper from './containers/Wrapper.js';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import idneditor from '../reducers'

const loggerMiddleware = createLogger()

let store = createStore(
	idneditor,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware, // neat middleware that logs actions
  )
)

render(
	<Provider store={ store }>
		<Wrapper />
	</Provider>,
  document.getElementById('app')
);
