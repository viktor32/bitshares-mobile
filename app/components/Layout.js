"use strict";

import React, {Component} from 'react';
import {DrawerLayoutAndroid, Navigator, Text, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Navigation from '../scenes/Navigation';
import Navigate from "../utils/Navigate";
import Toolbar from './Toolbar';

const styles = {
	scene: {
		flex: 1,
		marginTop: 56
	},
	sceneWithoutToolbar: {
		flex: 1,
		marginTop: 0
	}
};

class Layout extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			drawer: null,
			navigator: null
		};
		this.openDrawer = this.openDrawer.bind(this);
	}
	
	setNavigator = (navigator) => {
		this.setState({
			navigator: new Navigate(navigator)
		});
	};
	
	openDrawer() {
		this.drawer.openDrawer();
	}
	
	render() {
		const navView = React.createElement(Navigation);
		
		let {state} = this.props;
		
		return (
			<DrawerLayoutAndroid
				drawerWidth={300}
				drawerPosition={DrawerLayoutAndroid.positions.Left}
				renderNavigationView={() => navView}
				drawerLockMode={state.walletExist ? 'unlocked' : 'locked-closed'}
				ref={(_drawer) => this.drawer = _drawer}
			>
				<Navigator
					initialRoute={Navigate.getInitialRoute()}
					navigationBar={state.walletExist ? <Toolbar onIconPress={this.openDrawer}/> : null}
					configureScene={() => {
						return Navigator.SceneConfigs.FadeAndroid;
					}}
					ref={(navigator) => { !this.state.navigator ? this.setNavigator(navigator) : null }}
					renderScene={(route) => {
						if(this.state.navigator && route.component) {
							return (
								<View
									style={state.walletExist ? styles.scene : styles.sceneWithoutToolbar}
									showsVerticalScrollIndicator={true}>
									<route.component title={route.title} path={route.path} {...route.props} navigator={this.state.navigator} />
								</View>
							);
						}
					}}
				/>
			</DrawerLayoutAndroid>
		)
	}
}

export default connect(state => ({
		state: state['wallet']
	}),
	(dispatch) => ({
		// actions: bindActionCreators(counterActions, dispatch)
	})
)(Layout);