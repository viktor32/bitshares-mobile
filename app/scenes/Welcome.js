import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

export default class Welcome extends Component {
	render() {
		return (
			<View>
				<Text>Current Scene: {this.props.title}</Text>
				
					<Text>Tap me to load the next scene</Text>
				
					<Text>Tap me to go back</Text>
			</View>
		)
	}
}