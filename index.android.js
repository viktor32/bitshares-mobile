import React, {Component} from 'react';
import {AppRegistry, DrawerLayoutAndroid, Navigator, Text, View} from 'react-native';

import Navigation from './app/scenes/Navigation';
import Navigate from "./app/utils/Navigate";

import { Toolbar } from './app/components';

class App extends Component {
	
	static childContextTypes = {
		drawer: React.PropTypes.object,
		navigator: React.PropTypes.object
	};
	
	constructor(props) {
		super(props);
		this.state = {
			drawer: null,
			navigator: null
		};
		this.openDrawer = this.openDrawer.bind(this);
	}
	
	getChildContext = () => {
		return {
			drawer: this.state.drawer,
			navigator: this.state.navigator
		}
	};
	
	setDrawer = (drawer) => {
		this.setState({
			drawer
		});
	};
	
	setNavigator = (navigator) => {
		this.setState({
			navigator: new Navigate(navigator)
		});
	};
	
	openDrawer() {
		this.drawer.openDrawer();
	}
	
	render() {
		const { drawer, navigator } = this.state;
		const navView = React.createElement(Navigation);
		return (
			<DrawerLayoutAndroid
				drawerWidth={300}
				drawerPosition={DrawerLayoutAndroid.positions.Left}
				renderNavigationView={() => navView}
				ref={(_drawer) => this.drawer = _drawer}
			>
				<Navigator
					initialRoute={Navigate.getInitialRoute()}
					navigationBar={<Toolbar onIconPress={this.openDrawer} />}
					configureScene={() => {
                            return Navigator.SceneConfigs.FadeAndroid;
                        }}
					ref={(navigator) => { !this.state.navigator ? this.setNavigator(navigator) : null }}
					renderScene={(route) => {
                        //if (this.state.navigator && route.component) {
                          //  return (
                            //    <View
                              //      style={styles.scene}
                                //    showsVerticalScrollIndicator={false}>
                                //	<route.component title={route.title} path={route.path} {...route.props} />
                               // </View>
                            //);
                        //}
                    }}
				/>
			</DrawerLayoutAndroid>
		)
	}
}

AppRegistry.registerComponent('wallet', () => App);

const styles = {
	scene: {
		flex: 1,
		marginTop: 56
	}
};