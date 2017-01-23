global.Buffer = require('buffer/').Buffer;
import './shim.js';
import React, {Component} from 'react';
import App from "./app/app";
import {AppRegistry} from 'react-native';

class Wallet extends Component {
	
	render() {
		return <App />;
	}
}

AppRegistry.registerComponent('wallet', () => Wallet);