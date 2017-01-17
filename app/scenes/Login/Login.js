import React, {Component} from 'react';
import {PropTypes, View, ScrollView, Text, Image, ActivityIndicator, TextInput, IntentAndroid} from 'react-native';
import {Card, Button, TextField, TextareaField, COLOR, TYPO} from 'react-native-material-design';

class SplashScreen extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			password: "",
			passwordError: "",
			repeatPassword: "",
			repeatPasswordError: "",
			brainKey: "",
			brainKeyError: "",
			isValid: false,
			loading: false
		};
		
		this.changePassword = this.changePassword.bind(this);
		this.changeRepeatPassword = this.changeRepeatPassword.bind(this);
		this.changeBrainKey = this.changeBrainKey.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	
	componentWillMount() {}
	
	changePassword(password) {
		this.updateForm(password, this.state.repeatPassword, this.state.brainKey);
	}
	
	changeRepeatPassword(repeatPassword) {
		this.updateForm(this.state.password, repeatPassword, this.state.brainKey);
	}
	
	changeBrainKey(brainKey) {
		this.updateForm(this.state.password, this.state.repeatPassword, brainKey);
	}
	
	updateForm(password, repeatPassword, brainKey) {
		let repeatPasswordError = '';
		let passwordError = '';
		let brainKeyError = '';
		if(password && password.length < 8) {
			passwordError = "Password must be 8 characters or more";
		}
		
		if(repeatPassword && repeatPassword != password) {
			repeatPasswordError = "Confirmation doesn't match Password";
		}
		
		if(brainKey) {
			let checkBrainKey = brainKey.replace(/[^A-z\s]+/g, ' ').replace(/\s+/g, ' ');
			if(checkBrainKey.length < 50) {
				brainKeyError = checkBrainKey.length + ' characters (recommended 50 or more)';
			} else {
				let words = checkBrainKey.trim().split(' ');
				if(words.length < 16) {
					brainKeyError = words.length + ' words (16 recommended)';
				}
			}
		}
		
		let isValid = (password && repeatPassword && brainKey && !passwordError && !repeatPasswordError);
		
		this.setState({
			password,
			repeatPassword,
			brainKey,
			passwordError,
			brainKeyError,
			repeatPasswordError,
			isValid
		});
	}
	
	onSubmit() {
		this.setState({
			loading: true
		});
		
		
	}
	
	render() {
		const {navigator} = this.props;
		const theme = "googleBlue";
		
		let {password, passwordError, repeatPassword, repeatPasswordError, brainKey, brainKeyError, isValid, loading} = this.state;
		
		return (
			<ScrollView>
				<Card>
					<Card.Media image={<Image source={require('./../../img/welcome.jpg')}/>} overlay>
						<Text style={[TYPO.paperFontHeadline, COLOR.paperGrey50]}>Welcome</Text>
						<Text style={[TYPO.paperSubhead, COLOR.paperGrey50]}>Bitshares wallet</Text>
					</Card.Media>
					<Card.Body>
						<Text>
							To get started you need to restore your wallet by brainkey or register a new account
						</Text>
					</Card.Body>
				</Card>
				<Card>
					<Card.Body>
						<Text>In order to restore from a brainkey, you will need to provide a password for your new
						      wallet below, then enter your brainkey.</Text>
						<TextField
							secureTextEntry={true}
							onChangeText={this.changePassword}
							value={password}
							error={passwordError}
							label="Password"
							returnKeyType="next"
							onSubmitEditing={() => this.refs.repeatPassword.focus()}
						/>
						
						<TextField
							ref="repeatPassword"
							secureTextEntry={true}
							onChangeText={this.changeRepeatPassword}
							value={repeatPassword}
							error={repeatPasswordError}
							label="Repeat password"
						/>
						
						<TextareaField
							ref="brainKey"
							onChangeText={this.changeBrainKey}
							value={brainKey}
							error={brainKeyError}
							label="Brainkey"
							numberOfLines={4}
							multiline={true}
							onSubmitEditing={() => this.refs.brainKey.focus()}
						/>
						<Card.Actions position="right" style={styles.actionBtns}>
							<Button primary={theme} text="RESTORE WALLET" raised={true} onPress={this.onSubmit} disabled={!isValid} loading={loading} />
						</Card.Actions>
					</Card.Body>
				</Card>
				<Button text="CREATE NEW ACCOUNT" primary={theme} onPress={() => { navigator.to('registation') }}/>
			</ScrollView>
		)
	}
}

const styles = {
	actionBtns: {
		marginTop: 15
	}
};

export default SplashScreen;