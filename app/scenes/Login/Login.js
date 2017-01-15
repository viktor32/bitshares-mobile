import React, {Component} from 'react';
import {PropTypes, View, Text, Image, TextInput, IntentAndroid} from 'react-native';
import {Card, Button, TextField, COLOR, TYPO} from 'react-native-material-design';

class SplashScreen extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			password: "",
			repeatPassword: ""
		}
	}
	
	componentWillMount() {
	}
	
	render() {
		const {navigator} = this.props;
		const theme = "googleBlue";
		return (
			<View>
				<Card>
					<Card.Media
						image={<Image source={require('./../../img/welcome.jpg')}/>}
						overlay
					>
						<Text style={[TYPO.paperFontHeadline, COLOR.paperGrey50]}>Welcome</Text>
						<Text style={[TYPO.paperSubhead, COLOR.paperGrey50]}>Bitshares wallet</Text>
					</Card.Media>
					<Card.Body>
						<Text>To get started you need to restore your wallet by brainkey or register a new
						      account</Text>
					</Card.Body>
				</Card>
				<Card>
					<Card.Body>
						<Text>In order to restore from a brainkey, you will need to provide a password for your new
						      wallet below, then enter your brainkey.</Text>
						<TextField
							secureTextEntry={true}
							onChangeText={(password) => this.setState({password})}
							value={this.state.password}
							label="Password"
						/>
						<TextField
							secureTextEntry={true}
							onChangeText={(repeatPassword) => this.setState({repeatPassword})}
							value={this.state.repeatPassword}
							label="Repeat password"
						/>
						
						<Card.Actions position="right">
							<Button primary={theme} text="RESTORE WALLET" raised={true} onPress={() => {}}/>
						</Card.Actions>
					</Card.Body>
				</Card>
				<Button text="CREATE NEW ACCOUNT" primary={theme} onPress={() => { navigator.to('registation') }}/>
			</View>
		)
	}
}

const styles = {};

export default SplashScreen;