import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ActionCableProvider } from 'react-actioncable-provider';


const API_WS_ROOT = `ws://localhost:3000/cable`


ReactDOM.render(
		<Router>
			<ActionCableProvider url={API_WS_ROOT}>
					<Route path="/" component={App} />
			</ActionCableProvider>
		</Router>, 
		document.getElementById('root')
	);
