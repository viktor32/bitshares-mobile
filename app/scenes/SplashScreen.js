import React, {Component, PropTypes} from 'react';
import {View, Image} from 'react-native';
import WalletUtils from '../utils/Wallet';

class SplashScreen extends Component {
	
	constructor(props) {
		super(props);
	}
	
	componentWillMount() {
		WalletUtils.initData(this.props.navigator);
	}
	
	render() {
		return (
			<View style={styles.view}>
				<Image style={styles.image} source={require('./../img/logo.png')} />
			</View>
		)
	}
}

const styles = {
	view: {
		backgroundColor: '#3F51B5',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		height: 80,
		width: 250
	}
};

export default SplashScreen;