"use strict";

import React, {Component} from 'react';
import Layout from './components/Layout';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Apis, ChainStore} from "react-native-bitshares";

import * as globalActions from './actions/globalActions';

class WalletApp extends Component {
	
	constructor(props) {
		super(props);
	}
	
	componentWillMount() {
		Apis.instance("wss://bitshares.openledger.info/ws", true).init_promise.then((res) => {
			console.log("connected to:", res[0].network);
			ChainStore.init().then(() => {
				console.log('Chain store inited');
				this.props.actions.changeConnectStatus(true, false, false);
			}).catch(error => {
				console.log("----- ChainStore.init error ----->", error);
				let syncFail = error.message === "ChainStore sync error, please check your system clock";
				this.props.actions.changeConnectStatus(false, syncFail, false);
			});
		});
	}
	
	render() {
		return (
			<Layout />
		);
	}
}

export default connect(state => ({}),
	(dispatch) => ({
		actions: bindActionCreators(globalActions, dispatch)
	})
)(WalletApp);